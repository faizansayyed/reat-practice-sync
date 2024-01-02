import React, { useMemo, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useDispatch, useSelector } from "react-redux";
import { setModelsData, setModelsToFilter } from "../actions/GlobalAction";
import { DEFAULT_SELECTED_OPTION } from "../constants";

const WeeklyNewUsersChart = ({ weeklyAllUserModel }) => {
  const modelsToFilter = useSelector(
    (state) => state.GlobalState.modelsToFilter
  );

  const [selectedOption, setSelectedOption] = useState(DEFAULT_SELECTED_OPTION);
  const dispatch = useDispatch();

  const [applicationLines] = useMemo(() => {
    if (!weeklyAllUserModel) {
      return [[], []];
    }

    const applicationLines = {};
    const filteredData = [];

    weeklyAllUserModel.forEach(({ application, yearData }) => {
      let filteredYearData = yearData;

      const MONTHS_TO_CONSIDER = selectedOption.includes("6M") ? 5 : 11;

      if (selectedOption !== "ALL") {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Calculate the start month for the 11-month window
        const startMonth = currentMonth - MONTHS_TO_CONSIDER;
        const startYear = startMonth <= 0 ? currentYear - 1 : currentYear;

        // Calculate the end month for the 11-month window
        const endMonth = currentMonth;
        const endYear = currentYear;

        filteredYearData = yearData
          .filter(({ year }) => year >= startYear && year <= endYear)
          .map(({ year, monthData }) => ({
            year,
            monthData: monthData.filter(({ month }) => {
              const monthNumber =
                new Date(`${year}-${month}-01`).getMonth() + 1;

              return (
                (year === startYear && monthNumber >= startMonth) ||
                (year === endYear && monthNumber <= endMonth) ||
                (year > startYear && year < endYear)
              );
            })
          }));
      }

      filteredYearData.forEach(({ monthData }) => {
        monthData.forEach(({ weekData }) => {
          weekData.forEach(({ week, userModel }) => {
            const count = userModel.reduce((acc, { count }) => acc + count, 0);

            if (!applicationLines[application]) {
              applicationLines[application] = {
                name: application,
                x: [],
                y: [],
                type: "scatter",
                mode: "lines+markers",
                visible: !modelsToFilter.includes(application)
                  ? true
                  : "legendonly"
              };
            }

            applicationLines[application].x.push(week);
            applicationLines[application].y.push(count);
          });
        });
      });

      filteredData.push({
        application,
        yearData: filteredYearData
      });
    });

    dispatch(setModelsData(filteredData));
    const applications = Object.values(applicationLines);

    return [applications];
  }, [weeklyAllUserModel, selectedOption]);

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };

  // Get legend visibility status and update the chart
  const handleLegendClick = (figure) => {
    setTimeout(() => {
      const dataToFilter = figure.data
        .filter((d) => d.visible && d.visible === "legendonly")
        .map(({ name }) => name);

      dispatch(setModelsToFilter(dataToFilter));
    }, 350);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          justifyContent: "center",
          marginTop: "10px"
        }}
      >
        <div>
          <p style={{ padding: 0, margin: 0, fontSize: 16 }}>
            Users usage trend by Application |
            <label
              onClick={() => handleOptionChange(DEFAULT_SELECTED_OPTION)}
              style={{
                cursor: "pointer",
                marginLeft: "5px",
                width: "auto",
                fontWeight:
                  selectedOption === DEFAULT_SELECTED_OPTION ? "bold" : "normal"
              }}
            >
              {DEFAULT_SELECTED_OPTION}
            </label>
            <label style={{ width: "auto", margin: "0px 5px" }}>|</label>
            <label
              onClick={() => handleOptionChange("ALL")}
              style={{
                cursor: "pointer",
                width: "auto",
                fontWeight: selectedOption === "ALL" ? "bold" : "normal"
              }}
            >
              ALL
            </label>
          </p>
        </div>
      </div>
      <Plot
        id="chart"
        data={Object.values(applicationLines)}
        layout={{
          autosize: false,
          width: "1100",
          height: "100%",
          xaxis: {
            tickangle: 45
          }
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
          responsive: true
        }}
        // onUpdate={(figure) => handleOnChartUpdate(figure)}
        onLegendClick={handleLegendClick}
      />
    </div>
  );
};

export default WeeklyNewUsersChart;
