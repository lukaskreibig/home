import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Props = {
    handleChange:any
    dateRange:number
    dropdown:string
}

const Dropdown:React.FC<Props> = ({handleChange, dateRange, dropdown}) => {

  const twoHours = 7200000
  let dateData = [{input: twoHours, description: "2 Hours"}, {input: (2 * twoHours), description: "4 Hours"}, {input: (6 * twoHours), description: "12 Hours"}]
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
          {(dropdown === "Time" ? (dateData) : (chartData)).map(data => <MenuItem value={data.input}>{data.description}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown