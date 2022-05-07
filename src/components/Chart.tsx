
import Plot from 'react-plotly.js';

type Props = {
    refineData:any
    dataPoints:number
}

const Chart:React.FC<Props> = ({refineData, dataPoints}) => {

    let parameter = ["um010", "um025", "um100", "pm1", "pm10", "pm25"]

let trace1 = {
  type: 'scatter',
  x: [...refineData[0].values() ],
  y: [...refineData[0].keys() ],
  mode: 'markers',
  name: 'um010',
  marker: {
    color: '#e9c46a',
    line: {
      color: '#e9c46a',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
};

let trace2 = {
  x: [...refineData[1].values() ],
  y: [...refineData[1].keys() ],
  mode: 'markers',
  name: 'um025',
  marker: {
    color: '#2a9d8f',
    line: {
      color: '#2a9d8f',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
};

  var trace4 = {
    x: [...refineData[3].values() ],
    y: [...refineData[3].keys() ],
    mode: 'markers',
    name: 'pm1',
    marker: {
      color: '#f4a261',
      line: {
        color: '#f4a261',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };

  var trace5 = {
    x: [...refineData[4].values() ],
    y: [...refineData[4].keys() ],
    mode: 'markers',
    name: 'pm10',
    marker: {
      color: '#e63946',
      line: {
        color: '#e63946',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };

  
  var trace6 = {
    x: [...refineData[5].values() ],
    y: [...refineData[5].keys() ],
    mode: 'markers',
    name: 'pm25',
    marker: {
      color: '#e76f51',
      line: {
        color: '#e76f51',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };

var config = {responsive: true}
var data = [trace1, trace2, trace4, trace5, trace6];

var layout:any = {
  width: 1400, height: 600,
  title: `Air Pollution Data - Detailed Map of German Stations - Average of ${dataPoints} Measurements in Chosen Time Span`,
  xaxis: {
    showgrid: true,
    showline: true,
    linecolor: 'rgb(102, 102, 102)',
    titlefont: {
      font: {
        color: 'rgb(204, 204, 204)'
      }
    },
    tickfont: {
      font: {
        color: 'rgb(102, 102, 102)'
      }
    },
    autotick: true,
    dtick: 10,
    ticks: 'outside',
    tickcolor: 'rgb(102, 102, 102)'
  },
  margin: {
    l: 280,
    r: 40,
    b: 50,
    t: 80
  },
  legend: {
    font: {
      size: 10,
    },
    yanchor: 'middle',
    xanchor: 'left'
  },
  hovermode: 'closest'
};

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

export default Chart;


