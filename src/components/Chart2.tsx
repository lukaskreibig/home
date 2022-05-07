
import Plot from 'react-plotly.js';

type Props = {
    refineData:any
    dataPoints:number
}

const Chart2:React.FC<Props> = ({refineData, dataPoints}) => {

    let parameter = ["um010", "um025", "um100", "pm1", "pm10", "pm25"]

    


            let data:any=[
            
                {type: 'bar', x: parameter, y: refineData, marker: {color: "#f4a261"}},
              ]
            
              let layout={
                width: 1000, height: 600, title: `Air Pollution Data - German Average of ${dataPoints} Measurements from 19 Stations in Chosen Time Span`,
              }
              var config = {responsive: true}
  return (
<>

      <Plot 
      data={data}
      layout={layout}
      config={config}
      />
      </>
  );
}

export default Chart2;


