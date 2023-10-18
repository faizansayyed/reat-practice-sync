#!/bin/bash
set -euo pipefail

cat << EOF
=========================================================
  buildspec build.sh -- This Script Servers the Pupose of taking all the actions needed before deployment to higher environments
    ---- PRE PUBLISH STEPS ----
    Phase 1. Execute Unit Tests 
    Phase 2. NexusIQ Scan 
    Phase 3. Build Docker Image (We will build or extract depending on Branch)
    Phase 4. Execute Twist Lock Scan (We Will Scan when it is the Master or Release Branch...)
    ---- PUBLISH STEPS ----
    Phase 5 Tag & Publish Docker Image To Nexus (We will tag and publish depending on Branch)
    Phase 6. Publish Helm chart to Nexus (We Will Publish depending on Branch)
    ---- DEPLOY STEPS ----
    Phase 7. Deploy Helm Chart (Deployment of the Docker Image & Applicaiton)
=========================================================
EOF

#Start Set Variables
[[ $CODEBUILD_RESOLVED_SOURCE_VERSION ]]
[[ $CODEBUILD_SOURCE_VERSION ]]
[[ $GIT_BRANCH_NAME ]]
[[ $BRANCH ]]

echo "CODEBUILD_SOURCE_VERSION - " $CODEBUILD_SOURCE_VERSION 
echo "CODEBUILD_RESOLVED_SOURCE_VERSION - " $CODEBUILD_RESOLVED_SOURCE_VERSION 
echo "GIT_BRANCH_NAME - " $GIT_BRANCH_NAME
echo "BRANCH -" $BRANCH



if [[ "${GIT_BRANCH_NAME}" == *"main"* ]]; then
  echo "Release build... Tagging as such..."
  export readonly DATE_TIME=$( date '+%F' )
  export readonly COMMIT_HASH="$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)"
	export readonly IMAGE_TAG="${GIT_BRANCH_NAME}-${DATE_TIME}-${COMMIT_HASH}"
  echo $IMAGE_TAG
else
  export readonly COMMIT_HASH="$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)"
	export readonly IMAGE_TAG=$BRANCH-$COMMIT_HASH
fi
export readonly REPOSITORY1_URI="$PIPELINE_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO_NAME"
export readonly CURRENT_HELM_VERSION=$(yq -r .version ./helm-chart/Chart.yaml)
export readonly NEW_HELM_VERSION=${CURRENT_HELM_VERSION}-${IMAGE_TAG}
#End Set Variables


#Phase 1. Build Docker Image
echo "Starting... Phase 4. Build Docker Image..."
if [ -z "$IMAGE_TAG" ] || [ "$IMAGE_TAG" == 'null' ]; then
    echo "Error. IMAGE_TAG is empty" 1>&2
    exit 1;
fi

# # for UI (React app only)
# cd ..
# Build Docker Image
cd ./application-source
npm run-script build
cd ..
docker build -t $REPOSITORY1_URI:latest ./application-source --progress=plain --no-cache

echo "Ending... Phase 4. Build Docker Image...\n"


#Phase 2. Execute TwistLock Scan
echo "Starting... Phase 5. Execute TwistLock/Prisma Scan..."

if [[ "${GIT_BRANCH_NAME}" == *"main"* ]]; then
	echo "Branch set to ${GIT_BRANCH_NAME}... Master or Release branch... Running twistlock Scan..."
  (cd ./codebuild && make twistlock-scan-image)
  #/tmp/twistlock-cli images scan --user $prisma_access_key --password $prisma_secret_key --address $twistlock_url --ci $REPOSITORY1_URI:latest

else
  echo "Branch set to ${GIT_BRANCH_NAME}... Not Master or Release branch... Skipping twistlock Scan..."
  #/tmp/twistlock-cli images scan --user $prisma_access_key --password $prisma_secret_key --address $twistlock_url --ci $REPOSITORY1_URI:latest
fi
echo "Ending... Phase 5. Execute Twist Lock Scan...\n"

#Phase 6. Tag & Publish Docker Image To ECR (We will tag and publish depending on Branch)
echo "Starting... Tag & Publish Docker Image To ECR..."
if [ -z "$IMAGE_TAG" ] || [ "$IMAGE_TAG" == 'null' ]; then
    echo "Error. IMAGE_TAG is empty" 1>&2
    exit 1;
fi

docker_publish () {
    echo "Logging into ECR for docker push"
    # $(aws ecr get-login --no-include-email --region $REGION --registry-ids $PIPELINE_ACCOUNT_NUMBER)
    aws ecr get-login-password --region $REGION  | docker login --username AWS --password-stdin $PIPELINE_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com
    echo "Pushing docker image '$REPOSITORY1_URI:$IMAGE_TAG' to ECR..."
    docker tag ${REPOSITORY1_URI}:latest ${REPOSITORY1_URI}:${IMAGE_TAG}
    docker push $REPOSITORY1_URI:$IMAGE_TAG
}

docker_publish
echo "Ending... Tag & Publish Docker Image To ECR...\n"


#Phase 7. Publish Helm chart to ECR (We Will Publish depending on Branch)
echo "Starting... Publish Helm chart to ECR..."
helm_publish () {

    echo "Setting Image Tag In Helm Chart..."
    yq -yi --arg tag $IMAGE_TAG '.image.tag = $tag' ./helm-chart/values.yaml
    cat ./helm-chart/values.yaml

    #echo "Setting some env vars..."
    #yq -yi --arg repo $CODEBUILD_SOURCE_VERSION '.deployed_branch = $repo' ./pipeline/aws/helm-charts/values.yaml
    #yq -yi --arg repo ${REPOSITORY1_URI}:${IMAGE_TAG} '.running_docker_image = $repo' ./pipeline/aws/helm-charts/values.yaml

    echo "Setting Image Repo In Helm Chart..."
    yq -yi --arg repo $REPOSITORY1_URI '.image.repo = $repo' ./helm-chart/values.yaml
    cat ./helm-chart/values.yaml

    echo "Setting Helm Versions ${NEW_HELM_VERSION}..."
    yq -yi --arg version $NEW_HELM_VERSION '.version = $version' ./helm-chart/Chart.yaml
    cat ./helm-chart/Chart.yaml 

    echo "Packaging Helm Chart..."
    helm package ./helm-chart
    HELM_CHART_NAME=$(yq -r .name ./helm-chart/Chart.yaml)

    echo "Logging into ECR for helm push..."
    aws ecr get-login-password --region $REGION | helm registry login --username AWS --password-stdin $PIPELINE_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com

    echo "Publishing helm chart to ECR..."
    helm push $HELM_CHART_NAME-$NEW_HELM_VERSION.tgz oci://$PIPELINE_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com/
  
    echo "Generate imagedefinitions.json for deployments..."
    printf '{"name":"'"$HELM_CHART_NAME"'","imageUri":"'"$REPOSITORY1_URI:$IMAGE_TAG"'","helm_chart_name":"'"$HELM_CHART_NAME"'", "helm_chart_repo":"'"$PIPELINE_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com/$HELM_CHART_NAME"'","helmChartVersion":"'"$NEW_HELM_VERSION"'" }\n' > imagedefinitions.json
    cat imagedefinitions.json
}

helm_publish
echo "Ending... Published Helm chart to ECR...\n"
