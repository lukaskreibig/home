import { useEffect, useState } from "react";
import "./App.css";
import ChartList from "./components/ChartList/ChartList";
import Dropdown from "./components/Dropdown/Dropdown";
import { SelectChangeEvent, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const App: React.FC = () => {
  const [data, setData] = useState<data | null>(null);
  const [average, setAverage] = useState<any>(null);
  const [countriesList, setCountriesList] = useState<countries | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const [dateRange, setDateRange] = useState<string>("month");
  const [chart, setChart] = useState<number>(1);
  const [country, setCountry] = useState<string>("DE");

  const [open, setOpen] = useState<boolean>(true);
  const handleClose = (): void => setOpen(false);

  useEffect((): void => {
    const getData = async (): Promise<void> => {
      try {
        setLoading(true);
        const [averageFetch, locationFetch, countriesFetch] = await Promise.all(
          [
            fetch(
              `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/averages?parameter=pm10&parameter=pm25&parameter=um010&parameter=pm1&parameter=um025&country=${country}&date_from=${
                new Date(Date.now() - 1).toISOString().split(".")[0]
              }&date_to=${
                new Date(Date.now()).toISOString().split(".")[0]
              }&spatial=country&temporal=${dateRange}`
            ),
            fetch(
              `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?parameter=pm10&parameter=pm25&limit=1000&page=1&offset=0&sort=desc&radius=1000&country=${country}&order_by=lastUpdated&dumpRaw=false`
            ),
            fetch(
              `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries`
            ),
          ]
        );
        if (!locationFetch.ok || !countriesFetch.ok || !averageFetch.ok) {
          setLoading(false);
          throw new Error(
            `Oh No! A failure occured fetching ${
              !locationFetch.ok
                ? `Location Data ${locationFetch.status}`
                : !countriesFetch.ok
                ? `Country Data: ${countriesFetch.status}`
                : `Average Data: ${averageFetch.status}`
            }`
          );
        }
        let airQualityData: data = await locationFetch.json();
        let averageData = await averageFetch.json();
        let countriesData = await countriesFetch.json();
        setAverage(averageData);
        setData(airQualityData);
        setCountriesList(countriesData.results);
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

  console.log("data", data);
  console.log("average", average);
  console.log("countriesList", countriesList);

  const handleSelect = (event: SelectChangeEvent) => {
    if (event.target.name === "Country") {
      setCountry(event.target.value as string);
    } else if (event.target.name === "Chart") {
      setChart(event.target.value as any);
    } else if (event.target.name === "Time") {
      setDateRange(event.target.value as any);
    }
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
            Air Pollution Data
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is an informal Graph that uses OpenAQ API to get you worldwide
            Air Pollution Data worldwide. Have fun playing around!
          </Typography>
        </Box>
      </Modal>

      <div className="dropdowncontainer">
        {
          <Dropdown
            handleSelect={handleSelect}
            dataValue={chart}
            dropdown={"Chart"}
          />
        }
        {data && (
          <Dropdown
            handleSelect={handleSelect}
            dataValue={country}
            dropdown={"Country"}
            countries={countriesList}
          />
        )}
        {chart === 2 ? (
          <Dropdown
            handleSelect={handleSelect}
            dataValue={dateRange}
            dropdown={"Time"}
          />
        ) : null}
      </div>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {error && (
        <div
          className="charts"
          id="message"
        >{`Error fetching the data - ${error}`}</div>
      )}
      {!data && (
        <div className="charts" id="message">
          Loading Data for the first time. This might take a while!
        </div>
      )}
      {data && (
        <ChartList dataAPI={data.results} chart={chart} average={average} />
      )}
    </div>
  );
};

export default App;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
