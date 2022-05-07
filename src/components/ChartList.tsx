import Chart from './Chart';
import Chart2 from './Chart2';

type Props = {
    dataAPI:any
}


const ChartList:React.FC<Props> = ({dataAPI}) => {

    let parameter = ["um010", "um025", "um100", "pm1", "pm10", "pm25"]
    let newData: any[]



    //Make New Collection for Arrays, one Array for Each Parameter
    newData = parameter.map(para => 
        dataAPI.results.filter((measure: { parameter: any; }) => measure.parameter === para)
        )

    // Exctract and Delete Duplicate IDs from API Data

   let exctractId = dataAPI.results.map((a: { location: any; }) => a.location )
    let uniqueId = Array.from(new Set(exctractId))

    // Counting how often we see the names! One Array is enough, because the Count is for each Parameter the same

   let count:any = uniqueId.map(unique => newData[0].reduce((acc:any, cur:any) => cur.location === unique ? ++acc : acc, 0))
        

// Use Reduce to Merge the same IDs and Sum the Values of all Air Pollution Parameters in an Array
let refineData:any = 0
refineData = newData.map( data => 
{
return data.reduce((acc: any, cur: any) =>
acc.set(cur.location, (acc.get(cur.location) || 0) + Number(cur.value)), new Map())
})


// Make the Calculation! We iterate through all of the 5 Perimeters seperately and make the calculation
// We then iterate through the Map and take the Sum Value and divide it through the Number of Entries we had before (Count)

refineData.map((mapset:any) => 
{ let index:any = 0
  return mapset.forEach( (value:any, key:any) => {
    mapset.set(key, value / count[index])
    index++
  }
)})
// making new arrays sorted after air pollution parameters
let mapOut = newData.map((a: any[]) => a.map( b => b.value ))



// Deutschlandweiter Durchschnitt
let value = mapOut.map((a: any[]) => 
{
    return (
            (a.reduce((a: any,b: any) => a + b, 0)) / a.length

)})

;

  return (

      <>
      <Chart refineData={refineData} />
      <Chart2 refineData={value} />
      </>
    
  );
  }

export default ChartList;


