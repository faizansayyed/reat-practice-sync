# ---- Base Node ----
FROM node:19-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# ---- Production ----
FROM registry.access.redhat.com/ubi8/ubi-minimal:latest

# Update the dependencies and install nginx
RUN microdnf update -y && rm -rf /var/cache/yum
RUN microdnf install nginx -y && microdnf clean all

# create the nginx runtime for kube
RUN mkdir -p /var/nginx/cache && \
  mkdir -p /var/nginx/run && \
  mkdir -p /var/nginx/log && \
  chown -R 1001:0 /var/nginx && \
  chmod -R g+w /var/nginx

# ---- Final Production ----
FROM node:19-alpine AS production
WORKDIR /app/chatbotui
COPY --from=dependencies /app/chatbotui/node_modules ./node_modules
COPY --from=build /app/chatbotui/.next ./.next
COPY --from=build /app/chatbotui/public ./public
COPY --from=build /app/chatbotui/package*.json ./
COPY --from=build /app/chatbotui/next.config.js ./next.config.js
COPY --from=build /app/chatbotui/next-i18next.config.js ./next-i18next.config.js

# Expose the port the app will run on
EXPOSE 8071

# Start the application
CMD ["npm", "start"]