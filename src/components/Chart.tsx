import Plot from "react-plotly.js";

type Props = {
  refineData: any;
  dataPoints: number;
  chart: number;
  dataAPI: any;
};
const Chart: React.FC<Props> = ({ refineData, dataPoints, chart, dataAPI }) => {

  console.log("refineData", refineData)
  console.log("dataAPChart", dataAPI)

  let parameter = [
    {name: "PM 10 µg/m³", value: "pm10"},
    {name: "PM 2.5 µg/m³", value: "pm25"},
  ];
  let color = ["#e9c46a", "#2a9d8f", "#f4a261", "#e63946", "#e76f51"];

  let dataSettings = parameter.map((para:any, index: number) => {
    return {
      type: "scatter",
      y: dataAPI.map((data:any) => (data.parameters.filter((pm:any) => pm.parameter === para.value)).map((value:any) => chart === 3 ? value.lastValue : value.average)).flat(1),
      mode: "markers",
      name: para.name,
      marker: {
        color: color[index],
        line: {
          color: color[index],
          width: 1,
        },
        symbol: "circle",
        size: 10,
      },
    };
  });

  let barSettings = [
    {
      type: "bar",
      x: refineData.map((data:any) => data.displayName + " " + data.unit),
      y: refineData.map((data:any) => data.average),
      marker: { color: "#f4a261" },
    },
  ];

  let data: any =
    chart === 2
      ? barSettings : dataSettings 
      

  let config = { responsive: true };

  let layout: any =

  chart === 2 ? {
    width: 1000,
    height: 600,
    title: `Air Pollution Data - Average of ${refineData.reduce((partialSum: any, a: any ) => partialSum + a.measurement_count, 0)} Measurements from all Stations in Chosen Time Span and Country`,
  }

  : {
          width: 1400,
          height: 600,
          title: `Air Pollution - Showing the ${chart  === 1 ? "Average" : "Latest"} Data from ${dataPoints} Stations ${chart  === 1 ? `using ${dataAPI.reduce((partialSum: any, a: any ) => partialSum + a.measurements, 0)} Measurements` : ""}`,
          xaxis: {
            showgrid: false,
            showline: false,
            // linecolor: "rgb(102, 102, 102)",
            // titlefont: {
            //   font: {
            //     color: "rgb(204, 204, 204)",
            //   },
            // },
            showticklabels: false,
            // tickfont: {
            //   font: {
            //     color: "rgb(102, 102, 102)",
            //   },
            // },
            // autotick: false,
            // dtick: 3,
            // ticks: "inside",
            // tickcolor: "rgb(102, 102, 102)",
          },
          margin: {
            l: 40,
            r: 10,
            b: 30,
            t: 80,
          },
          legend: {
            
              x: 0,
              y: 1,
            
            font: {
              size: 15,
            },
            yanchor: "middle",
            xanchor: "left",
          },
          hovermode: "closest",
        };
console.log(chart)
  return (
    <>
      <Plot data={data} layout={layout} config={config} />
    </>
  );
};

export default Chart;
