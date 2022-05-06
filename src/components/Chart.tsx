import Plot from 'react-plotly.js';
import { idText } from 'typescript';

type Props = {
    dataAPI:any
}


const Chart:React.FC<Props> = ({dataAPI}) => {

    let parameter = ["um010", "um025", "um100", "pm1", "pm10", "pm25"]
    let newData: any[]



    //Filter After Air Pollution Parameter
    newData = parameter.map(para => 
        dataAPI.results.filter((measure: { parameter: any; }) => measure.parameter === para)
        )
        console.log("AllAPIDATA", dataAPI)
        


//Exctracting the City Names
let country = newData[0].map((a: { location: any; }) => a.location)

    // THIS IS DIFFERENT

    // Exctract and Delete Duplicate IDs from API Data

   let exctractId = dataAPI.results.map((a: { location: any; }) => a.location )
    let uniqueId = Array.from(new Set(exctractId))
    console.log("uniqueId", uniqueId)

    // Counting how often we see the names!

    let count = uniqueId.map(unique => dataAPI.results.reduce((acc:any, cur:any) => cur.location === unique ? ++acc : acc, 0));
        console.log("count how often we see the names", count)
        

// Use Reduce to Merge the same IDs and Sum the Values of all Air Pollution Parameters in an Array

let amen = newData.map( data => 
{
return data.reduce((acc: any, cur: any) =>
acc.set(cur.location, (acc.get(cur.location) || 0) + Number(cur.value)), new Map())
})

amen.map(la => la)

console.log("Amen",amen)


// TO DO 

// uniqueId ist falschrum, wie sieht es mit amen aus?
// es fehlt bei count und amen noch die aufteilung in die einzelnen parameter VOR der Rechnung








// let chars = ['A', 'B', 'A', 'C', 'B'];
// let uniqueChars = [...new Set(chars)];

// console.log(uniqueChars);



    // END OF DIFFERENT








//Looking how often the same name is in the array
let nameCount = country.filter((a: any[]) => newData[0][0].location === a).length
console.log(nameCount)



// making new arrays sorted after air pollution parameters
let mapOut = newData.map((a: any[]) => a.map( b => b.value ))
console.log("MapOut", mapOut)



// Deutschlandweiter Durchschnitt
let value = mapOut.map((a: any[]) => 
{
    return (
            (a.reduce((a: any,b: any) => a + b, 0)) / a.length

)})

console.log("newData", newData)
console.log("value", value)
console.log("newData[0]", newData[0])
console.log("country", country)

var trace1 = {
  type: 'scatter',
  x: mapOut[0],
  y: country,
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

var trace2 = {
  x: mapOut[1],
  y: country,
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

var trace3 = {
    x: mapOut[2],
    y: country,
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
    x: mapOut[3],
    y: country,
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
    x: mapOut[4],
    y: country,
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
    x: mapOut[5],
    y: country,
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

  console.log(data)

  return (

      <Plot 
      data={data}
      layout={layout}
      />
    
  );
}

export default Chart;
function newSet(exctractId: any) {
    throw new Error('Function not implemented.');
}

