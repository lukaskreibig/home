import { useEffect, useState } from 'react';
import './App.css';
import ChartList from './components/ChartList';
import Dropdown from './components/Dropdown';
import { CircularProgress, SelectChangeEvent, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

function App() {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const [dateRange, setDateRange] = useState<number>(7200000);
  const [chart, setChart] = useState<number>(1);

  useEffect((): void => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://docs.openaq.org/v2/measurements?country=DE&date_from=${new Date(Date.now() - dateRange).toISOString().split('.')[0]}&date_to=${(new Date().toISOString().split('.')[0])}&order_by=location&limit=40000`
        );
        if (!response.ok) {
          setLoading(false)
          throw new Error(
            `Oh No! A HTTP error occured: Status ${response.status}`
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

  const handleChart = (event: SelectChangeEvent) => {
    setChart(event.target.value as any);
  };

  console.log(dateRange)


  return (
    <div className="App">

    <div className="dropdowncontainer">
    {<Dropdown handleChange={handleChart} dateRange={chart} dropdown={"Chart"} />}
    {<Dropdown handleChange={handleChange} dateRange={dateRange} dropdown={"Time"} />}
    </div>
    {loading && <Box sx={{ width: '100%' }}> <LinearProgress /> </Box>}
    {error && <div className="charts" id="message">{`Error fetching the data - ${error}`}</div>}
    {!data && <div className="charts" id="message"> Loading Data for the first time. This might take a while! </div>
    }
    {data && <ChartList dataAPI={data} chart={chart} /> }
    </div>
  );
}

export default App;
