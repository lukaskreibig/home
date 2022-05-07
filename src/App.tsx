import { useEffect, useState } from 'react';
import './App.css';
import ChartList from './components/ChartList';
import Dropdown from './components/Dropdown';
import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function App() {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const [dateRange, setDateRange] = useState<number>(3600000);

  useEffect((): void => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://docs.openaq.org/v2/measurements?country=DE&date_from=${new Date(Date.now() - dateRange).toISOString().split('.')[0]}&date_to=${(new Date().toISOString().split('.')[0])}&order_by=location&limit=40000`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dateRange]);

  console.log(data)

  const handleChange = (event: SelectChangeEvent) => {
    setDateRange(event.target.value as any);
  };

  console.log(dateRange)


  return (
  
    <div className="App">
    {error && <div>{`Error fetching the data - ${error}`}</div>}
    {<Dropdown handleChange={handleChange} dateRange={dateRange} />}
    
    {loading &&     <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>}
    {data && <ChartList dataAPI={data} /> }
    
      
    </div>
  );
}

export default App;


