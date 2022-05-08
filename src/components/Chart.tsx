import Plot from "react-plotly.js";

type Props = {
  refineData: any;
  dataPoints: number;
  chart: number;
};

const Chart: React.FC<Props> = ({ refineData, dataPoints, chart }) => {
  let parameter = [
    "UM 0.10 µg/m³",
    "UM 0.25 µg/m³",
    "PM 1 µg/m³",
    "PM 10 µg/m³",
    "PM 2.5 µg/m³",
  ];
  let color = ["#e9c46a", "#2a9d8f", "#f4a261", "#e63946", "#e76f51"];

  let dataSettings = parameter.map((para: string, index: number) => {
    return {
      type: "scatter",
      x: chart === 1 ? [...refineData[index].values()] : null,
      y: chart === 1 ? [...refineData[index].keys()] : null,
      mode: "markers",
      name: para[index],
      marker: {
        color: color[index],
        line: {
          color: color[index],
          width: 1,
        },
        symbol: "circle",
        size: 16,
      },
    };
  });

  var data: any =
    chart === 1
      ? dataSettings
      : [
          {
            type: "bar",
            x: parameter,
            y: refineData,
            marker: { color: "#f4a261" },
          },
        ];
  var config = { responsive: true };

  var layout: any =
    chart === 1
      ? {
          width: 1400,
          height: 600,
          title: `Air Pollution Data - Detailed Map - Average of ${dataPoints} Measurements in Chosen Time Span`,
          xaxis: {
            showgrid: true,
            showline: true,
            linecolor: "rgb(102, 102, 102)",
            titlefont: {
              font: {
                color: "rgb(204, 204, 204)",
              },
            },
            tickfont: {
              font: {
                color: "rgb(102, 102, 102)",
              },
            },
            autotick: true,
            dtick: 10,
            ticks: "outside",
            tickcolor: "rgb(102, 102, 102)",
          },
          margin: {
            l: 280,
            r: 40,
            b: 50,
            t: 80,
          },
          legend: {
            font: {
              size: 10,
            },
            yanchor: "middle",
            xanchor: "left",
          },
          hovermode: "closest",
        }
      : {
          width: 1000,
          height: 600,
          title: `Air Pollution Data - Average of ${dataPoints} Measurements from all Stations in Chosen Time Span and Country`,
        };

  return (
    <>
      <Plot data={data} layout={layout} config={config} />
    </>
  );
};

export default Chart;
