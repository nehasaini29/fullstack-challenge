import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import type { CarSort } from "../types";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
  years: number[];
  sort: CarSort;
  onSortChange: (value: CarSort) => void;
};

export function CarFilters(props: Props) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
      <TextField
        label="Search by model"
        value={props.search}
        onChange={(event) => props.onSearchChange(event.target.value)}
        size="small"
        sx={{ flex: 1, minWidth: 220 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        select
        label="Year"
        value={props.year}
        onChange={(event) => props.onYearChange(event.target.value)}
        size="small"
        sx={{ minWidth: 125 }}
      >
        <MenuItem value="all">All years</MenuItem>
        {props.years.map((year) => (
          <MenuItem key={year} value={String(year)}>
            {year}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Sort"
        value={props.sort}
        onChange={(event) => props.onSortChange(event.target.value as CarSort)}
        size="small"
        sx={{ minWidth: 175 }}
      >
        <MenuItem value="year-desc">Newest first</MenuItem>
        <MenuItem value="year-asc">Oldest first</MenuItem>
        <MenuItem value="model-asc">Model A–Z</MenuItem>
      </TextField>
    </Stack>
  );
}
