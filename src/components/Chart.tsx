import Plot from 'react-plotly.js';

type Props = {
    refineData:any
}


const Chart:React.FC<Props> = ({refineData}) => {

    let parameter = ["um010", "um025", "um100", "pm1", "pm10", "pm25"]
    let newData: any[]


    console.log("refineData",refineData)


let trace1 = {
  type: 'scatter',
  x: [...refineData[0].values() ],
  y: [...refineData[0].keys() ],
  mode: 'markers',
  name: 'um010',
  marker: {
    color: 'rgba(156, 165, 196, 0.95)',
    line: {
      color: 'rgba(156, 165, 196, 1.0)',
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
    color: 'rgba(204, 204, 204, 0.95)',
    line: {
      color: 'rgba(217, 217, 217, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
};

let trace3 = {
    x: [...refineData[2].values()],
    y: [...refineData[2].keys()],
    mode: 'markers',
    name: 'um100',
    marker: {
      color: 'rgba(17, 22, 204, 0.95)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
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
      color: 'rgba(90, 90, 90, 0.95)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
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
      color: 'rgba(111, 24, 124, 0.95)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
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
      color: 'rgba(124, 203, 280, 0.95)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };

var data = [trace1, trace2, trace3, trace4, trace5, trace6];

var layout:any = {
  title: 'Air Pollution Data',
  xaxis: {
    showgrid: false,
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
    autotick: false,
    dtick: 10,
    ticks: 'outside',
    tickcolor: 'rgb(102, 102, 102)'
  },
  margin: {
    l: 140,
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
  width: 600,
  height: 600,
  paper_bgcolor: 'rgb(254, 247, 234)',
  plot_bgcolor: 'rgb(254, 247, 234)',
  hovermode: 'closest'
};

  return (

      <Plot 
      data={data}
      layout={layout}
      />
  );
}

export default Chart;


