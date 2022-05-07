import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Props = {
    handleChange:any
    dateRange:number
}

const Dropdown:React.FC<Props> = ({handleChange, dateRange}) => {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Date Range</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dateRange}
          label="Date Range"
          onChange={handleChange}
        >
          <MenuItem value={1800000}>30 Minutes</MenuItem>
          <MenuItem value={3600000}>1 Hour</MenuItem>
          <MenuItem value={7200000}>2 Hour</MenuItem>
          <MenuItem value={86400000}>1 Day</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown