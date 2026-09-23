import { useEffect, useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import type { CreateCarInput } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateCarInput) => Promise<unknown>;
  loading: boolean;
  serverError?: string;
};

const initialValues = { make: "", model: "", year: "", color: "" };

export function CreateCarDialog({ open, onClose, onCreate, loading, serverError }: Props) {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setValues(initialValues);
      setSubmitted(false);
    }
  }, [open]);

  const update = (field: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!values.make.trim() || !values.model.trim() || !values.year || !values.color.trim()) {
      return;
    }

    try {
      await onCreate({
        make: values.make.trim(),
        model: values.model.trim(),
        year: Number(values.year),
        color: values.color.trim(),
        mobile: "",
        tablet: "",
        desktop: "",
      });
      onClose();
    } catch {
      // Apollo exposes the useful API message through serverError above.
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>Add a car</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Make"
              value={values.make}
              onChange={update("make")}
              error={submitted && !values.make.trim()}
              helperText={submitted && !values.make.trim() ? "Make is required" : " "}
              autoFocus
              required
            />
            <TextField
              label="Model"
              value={values.model}
              onChange={update("model")}
              error={submitted && !values.model.trim()}
              helperText={submitted && !values.model.trim() ? "Model is required" : " "}
              required
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Year"
                type="number"
                value={values.year}
                onChange={update("year")}
                error={submitted && !values.year}
                helperText={submitted && !values.year ? "Year is required" : " "}
                slotProps={{ htmlInput: { min: 1900, max: 2100 } }}
                fullWidth
                required
              />
              <TextField
                label="Color"
                value={values.color}
                onChange={update("color")}
                error={submitted && !values.color.trim()}
                helperText={submitted && !values.color.trim() ? "Color is required" : " "}
                fullWidth
                required
              />
            </Stack>
            {serverError && <Alert severity="error">{serverError}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Adding…" : "Add car"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
