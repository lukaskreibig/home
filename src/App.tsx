import React, { useEffect, useState } from 'react';
import './App.css';
import ChartList from './components/ChartList';

function App() {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  useEffect((): void => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://docs.openaq.org/v2/measurements?country=DE&date_from=2022-05-05T13:40:00&date_to=2022-05-05T13:52:00&order_by=location&limit=10000`
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
  }, []);

  console.log(data)

  return (
  
    <div className="App">
    {loading && <div>Loading...</div>}
    {error && <div>{`Error fetching the data - ${error}`}</div>}

    {data && <ChartList dataAPI={data} /> }
      
      
    </div>
  );
}

export default App;
