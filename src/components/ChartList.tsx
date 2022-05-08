import { animated, useSpring } from "react-spring";
import Chart from "./Chart";

type Props = {
  dataAPI: data;
  chart: number;
};

const ChartList: React.FC<Props> = ({ dataAPI, chart }) => {

  const fadeIn = useSpring({
    from: { y: 0, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: {
      duration: 500,
    },
  });

  let parameter = ["um010", "um025", "pm1", "pm10", "pm25"];
  let newData: any[];

  //Make New Collection for Arrays, one Array for Each Parameter
  newData = parameter.map((para) =>
    dataAPI.results.filter(
      (measure: { parameter: any }) => measure.parameter === para
    )
  );

  // Exctract and Delete Duplicate IDs from API Data

  let exctractId = dataAPI.results.map((a: { location: any }) => a.location);
  let uniqueId = Array.from(new Set(exctractId));

  // Counting how often we see the names! One Array is enough, because the Count is for each Parameter the same

  let count: any = uniqueId.map((unique) =>
    newData[0].reduce(
      (acc: any, cur: any) => (cur.location === unique ? ++acc : acc),
      0
    )
  );

  // Use Reduce to Merge the same IDs and Sum the Values of all Air Pollution Parameters in an Array
  let refineData: any = 0;
  refineData = newData.map((data) => {
    return data.reduce(
      (acc: any, cur: any) =>
        acc.set(cur.location, (acc.get(cur.location) || 0) + Number(cur.value)),
      new Map()
    );
  });

  // Make the Calculation! We iterate through all of the 5 Perimeters seperately and make the calculation
  // We then iterate through the Map and take the Sum Value and divide it through the Number of Entries we had before (Count)

  refineData.map((mapset: any) => {
    let index: any = 0;
    return mapset.forEach((value: any, key: any) => {
      mapset.set(key, value / count[index]);
      index++;
    });
  });


  let nationWideAverage = newData.map((a: any[]) => a.map((b) => b.value));
  
  let nationWideValue = nationWideAverage.map((a: any[]) => {
    return a.reduce((a: any, b: any) => a + b, 0) / a.length;
  });

  const dataPoints = dataAPI.results.length;

  return !dataPoints ? (
    <div className="charts" id="message">
      {" "}
      No Data for given time span. Probably there is no up-to-date data from the
      given country.{" "}
    </div>
  ) : (
    <animated.div className="charts" style={fadeIn}>
      {
        <Chart
          refineData={chart === 1 ? refineData : nationWideValue}
          dataPoints={dataPoints}
          chart={chart}
        />
      }
    </animated.div>
  );
};

export default ChartList;
