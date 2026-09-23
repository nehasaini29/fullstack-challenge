import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CarCard } from "../components/CarCard";
import { CarFilters } from "../components/CarFilters";
import { CreateCarDialog } from "../components/CreateCarDialog";
import { useCarFilters } from "../hooks/useCarFilters";
import { useCars } from "../hooks/useCars";

export function CarInventoryPage() {
  const [formOpen, setFormOpen] = useState(false);
  const { cars, loading, error, refetch, createCar, creating, createError } = useCars();
  const filters = useCarFilters(cars);

  return (
    <Box component="main" sx={{ minHeight: "100vh", pb: 8 }}>
      <Box sx={{ bgcolor: "#101820", color: "common.white", py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "start", sm: "end" }}
            spacing={3}
          >
            <Box>
              <Typography variant="overline" sx={{ color: "#9eabb8", letterSpacing: 1.8 }}>
                Vehicle collection
              </Typography>
              <Typography variant="h3" component="h1" sx={{ mt: 0.5, fontWeight: 650 }}>
                Car inventory
              </Typography>
              <Typography sx={{ color: "#c5cdd5", mt: 1, maxWidth: 540 }}>
                Browse the current collection or add another vehicle to the garage.
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddRoundedIcon />}
              onClick={() => setFormOpen(true)}
              sx={{ bgcolor: "common.white", color: "#101820", "&:hover": { bgcolor: "#eef1f4" } }}
            >
              Add a car
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: { xs: 3, md: 4 } }}>
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <CarFilters
            search={filters.search}
            onSearchChange={filters.setSearch}
            year={filters.year}
            onYearChange={filters.setYear}
            years={filters.years}
            sort={filters.sort}
            onSortChange={filters.setSort}
          />
        </Paper>

        {loading && (
          <Stack alignItems="center" spacing={2} sx={{ py: 10 }} role="status">
            <CircularProgress size={36} />
            <Typography color="text.secondary">Loading the collection…</Typography>
          </Stack>
        )}

        {error && (
          <Alert
            severity="error"
            action={<Button color="inherit" onClick={() => void refetch()}>Try again</Button>}
          >
            We couldn’t load the cars. Please try again.
          </Alert>
        )}

        {!loading && !error && filters.visibleCars.length === 0 && (
          <Paper variant="outlined" sx={{ py: 8, px: 3, textAlign: "center" }}>
            <DirectionsCarRoundedIcon sx={{ fontSize: 44, color: "text.disabled" }} />
            <Typography variant="h6" sx={{ mt: 1 }}>No cars found</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Try changing your search or year filter.
            </Typography>
            <Button onClick={filters.clear} sx={{ mt: 2 }}>Clear filters</Button>
          </Paper>
        )}

        {!loading && !error && filters.visibleCars.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {filters.visibleCars.length} {filters.visibleCars.length === 1 ? "vehicle" : "vehicles"}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
                gap: 2.5,
              }}
            >
              {filters.visibleCars.map((car) => <CarCard key={car.id} car={car} />)}
            </Box>
          </>
        )}
      </Container>

      <CreateCarDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreate={createCar}
        loading={creating}
        serverError={createError?.message}
      />
    </Box>
  );
}
