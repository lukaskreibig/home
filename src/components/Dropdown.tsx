import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Props = {
    handleChange:any
    dateRange:any
    dropdown:string
    countries?:any
};

const Dropdown:React.FC<Props> = ({handleChange, dateRange, dropdown, countries}) => {

  const twoHours = 7200000
  let dateData = [{input: twoHours / 2, description: "Last Hour"}, {input: twoHours, description: "Last Two Hours"}, {input: (2 * twoHours), description: "Last Four Hours"}, {input: (6 * twoHours), description: "Last Twelve Hours"}]
  let chartData = [{input: 1, description: "Detailed Air Pollution"}, {input: 2, description: "Average Air Pollution"} ]

  return (
    <Box  sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{dropdown}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dateRange}
          label={dropdown}
          onChange={handleChange}
        >
          {(dropdown === "Time" ? (dateData) : dropdown === "Chart" ? (chartData) : (countries)).map((data:any) => <MenuItem value={!countries ? data.input : data.code} key={data.input}>{!countries ? data.description : data.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown