import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { Car } from "../types";

const FALLBACK_IMAGE = "/vite.svg";

export function CarCard({ car }: { car: Car }) {
  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        height: "100%",
        overflow: "hidden",
        transition: "transform 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 28px rgba(20, 29, 43, 0.10)",
        },
      }}
    >
      <Box
        component="picture"
        sx={{ display: "block", bgcolor: "grey.100", aspectRatio: "16 / 9" }}
      >
        <source media="(min-width: 1024px)" srcSet={car.desktop || FALLBACK_IMAGE} />
        <source media="(min-width: 640px)" srcSet={car.tablet || FALLBACK_IMAGE} />
        <Box
          component="img"
          src={car.mobile || FALLBACK_IMAGE}
          alt={`${car.year} ${car.make} ${car.model} in ${car.color}`}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </Box>

      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" gap={2} alignItems="start">
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
              {car.make}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ lineHeight: 1.2 }}>
              {car.model}
            </Typography>
          </Box>
          <Chip label={car.year} size="small" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {car.color}
        </Typography>
      </CardContent>
    </Card>
  );
}
