import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { scrollingForm } from "./dialogStyles";
import SuccessDialog from "./SuccessDialog";
import { isValidMobile, sendErrorMessage, sendToInbox } from "../../lib/inbox";

const emptyForm = { name: "", mobile: "", feedback: "" };

function validate({ name, mobile, feedback }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!isValidMobile(mobile)) errors.mobile = "Please enter a valid 10-digit mobile number.";
  if (feedback.trim().length < 5) errors.feedback = "Please write your feedback.";
  return errors;
}

export default function ContactDialog({ open, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | setup | failed
  const [thankedName, setThankedName] = useState(null);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleClose = () => {
    if (status === "sending") return;
    onClose();
    setForm(emptyForm);
    setErrors({});
    setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    const name = form.name.trim();
    const { ok, error } = await sendToInbox(`Website feedback from ${name}`, {
      Name: name,
      Mobile: form.mobile.trim(),
      Feedback: form.feedback.trim(),
    });
    if (!ok) {
      setStatus(error);
      return;
    }
    setStatus("idle");
    setForm(emptyForm);
    onClose();
    setThankedName(name);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        aria-labelledby="contact-title"
      >
        <DialogTitle id="contact-title" sx={{ pr: 7 }}>
          <Typography
            component="span"
            sx={{
              display: "block",
              fontSize: 10,
              letterSpacing: 1.8,
              fontWeight: 700,
              color: "secondary.main",
              mb: 0.5,
            }}
          >
            CONTACT US
          </Typography>
          <Typography
            component="span"
            sx={{
              display: "block",
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 26,
              color: "primary.dark",
            }}
          >
            We would love to hear from you
          </Typography>
          <IconButton
            onClick={handleClose}
            aria-label="Close"
            sx={{ position: "absolute", top: 12, right: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={scrollingForm}>
          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={2.5}>
              <TextField
                label="Your name"
                value={form.name}
                onChange={handleChange("name")}
                error={Boolean(errors.name)}
                helperText={errors.name}
                autoComplete="name"
                required
                fullWidth
              />
              <TextField
                label="Mobile number"
                value={form.mobile}
                onChange={handleChange("mobile")}
                error={Boolean(errors.mobile)}
                helperText={errors.mobile}
                autoComplete="tel"
                slotProps={{ htmlInput: { inputMode: "tel", maxLength: 16 } }}
                required
                fullWidth
              />
              <TextField
                label="Your feedback"
                value={form.feedback}
                onChange={handleChange("feedback")}
                error={Boolean(errors.feedback)}
                helperText={errors.feedback}
                multiline
                minRows={4}
                required
                fullWidth
              />

              {(status === "setup" || status === "failed") && (
                <Alert severity="error">{sendErrorMessage(status)}</Alert>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} color="inherit" disabled={status === "sending"}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={status === "sending"}
              startIcon={
                status === "sending" ? <CircularProgress size={16} color="inherit" /> : null
              }
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <SuccessDialog
        open={Boolean(thankedName)}
        title="Thank you for your feedback!"
        message={`Dear ${thankedName ?? ""}, we have received your message and truly appreciate you taking the time to write to us.`}
        onClose={() => setThankedName(null)}
      />
    </>
  );
}
