import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type Props = {
  handleSelect: any;
  dataValue: any;
  dropdown: string;
  countries?: any;
};

const Dropdown: React.FC<Props> = ({
  handleSelect,
  dataValue,
  dropdown,
  countries,
}) => {
  const twoHours = 7200000;
  let dateData = [
    { input: twoHours / 2, description: "Last Hour" },
    { input: twoHours, description: "Last Two Hours" },
    { input: 2 * twoHours, description: "Last Four Hours" },
    { input: 6 * twoHours, description: "Last Twelve Hours" },
  ];
  let chartData = [
    { input: 1, description: "Detailed Air Pollution" },
    { input: 2, description: "Average Air Pollution" },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{dropdown}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dataValue}
          name={dropdown}
          label={dropdown}
          onChange={handleSelect}
        >
          {(dropdown === "Time"
            ? dateData
            : dropdown === "Chart"
            ? chartData
            : countries
          ).map((data: any, index:any) => (
            <MenuItem
              value={!countries ? data.input : data.code}
              key={index}
            >
              {!countries ? data.description : data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
