import { useEffect, useState } from 'react';
import './App.css';
import ChartList from './components/ChartList';
import Dropdown from './components/Dropdown';
import { SelectChangeEvent, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function App() {

  const [data, setData] = useState<any>(null);
  const [countriesList, setCountriesList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const [dateRange, setDateRange] = useState<number>(7200000);
  const [chart, setChart] = useState<number>(1);
  const [country, setCountry] = useState<string>("DE");

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  useEffect((): void => {
    const getData = async () => {
      try {
        setLoading(true)
        const [airquality, countries] = await Promise.all([
        fetch(`https://docs.openaq.org/v2/measurements?parameter=pm10&parameter=pm25&parameter=um010&parameter=pm1&parameter=um025&country=${country}&date_from=${new Date(Date.now() - dateRange).toISOString().split('.')[0]}&date_to=${(new Date().toISOString().split('.')[0])}&order_by=location&limit=40000`),
        fetch(`https://docs.openaq.org/v2/countries`)
      ]);
        if (!airquality.ok && countries) {
          setLoading(false)
          throw new Error(
            `Oh No!HTTP error: Status ${airquality.status}. Probably too much Data is being loaded. Try a shorter time span.`
          );
        }
        let airQualityData = await airquality.json();
        let countriesData = await countries.json();
        setData(airQualityData);
        setCountriesList(countriesData.results)
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dateRange, country]);

  console.log("fetchdata", data)
  // console.log(new Date().toISOString())
  // console.log(new Date().toUTCString())


  const handleSelect = (event: SelectChangeEvent) => {
    console.log("e",event)
    if (event.target.name === "Country") 
    {setCountry(event.target.value as any)}
    else if (event.target.name === "Chart") 
    {setChart(event.target.value as any)}
    else if (event.target.name === "Time") 
   {setDateRange(event.target.value as any)}
  };


  return (

    <div className="App">

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h3">
        Latest Air Pollution Data
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           This is an informal Graph that uses OpenAQ API to get you the latest Air Pollution Data worldwide. You'll always get the average data of a country in the chosen time span.
         </Typography>
      </Box>
    </Modal>


    <div className="dropdowncontainer">
    {<Dropdown handleSelect={handleSelect} dataValue={chart} dropdown={"Chart"} />}
    {<Dropdown handleSelect={handleSelect} dataValue={dateRange} dropdown={"Time"} />}
    {data && <Dropdown handleSelect={handleSelect} dataValue={country} dropdown={"Country"} countries={countriesList} />}
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
