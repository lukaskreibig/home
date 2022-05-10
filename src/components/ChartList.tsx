import Chart from "./Chart";

type Props = {
  dataAPI: any;
  chart: number;
  average: any;
};

const ChartList: React.FC<Props> = ({ dataAPI, chart, average }) => {

  const dataPoints = dataAPI.length;

  console.log("dataAPI",dataAPI)
  console.log("average",average)

  return !average.results.length || !dataPoints ? (
    <div className="charts" id="message">
      No Data found. Probably there is no up-to-date data from the given
      country.
    </div>
  ) : (
    <div className="charts">
      {
        <Chart
          refineData={average.results}
          dataAPI={dataAPI}
          dataPoints={dataPoints}
          chart={chart}
        />
      }
    </div>
  );
};

export default ChartList;
