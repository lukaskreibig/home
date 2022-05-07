
import Plot from 'react-plotly.js';

type Props = {
    refineData:any
}

const Chart2:React.FC<Props> = ({refineData}) => {

    let parameter = ["um010", "um025", "um100", "pm1", "pm10", "pm25"]


            let data:any=[
            
                {type: 'bar', x: parameter, y: refineData},
              ]
            
              let layout={width: 320, height: 240, title: 'German Average'}
  return (
<>

      <Plot 
      data={data}
      layout={layout}
      />
      </>
  );
}

export default Chart2;


