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
import { isValidMobile, isValidPincode, sendErrorMessage, sendToInbox } from "../../lib/inbox";

// What each kind of order is called in the popup and in the email subject.
const KINDS = {
  book: { eyebrow: "ORDER THIS BOOK", subject: "Book order" },
  magazine: { eyebrow: "REQUEST THIS ISSUE", subject: "Magazine request" },
  subscription: { eyebrow: "YEARLY SUBSCRIPTION", subject: "Magazine subscription" },
};

const MAX_QUANTITY = 500;
const emptyDetails = { name: "", mobile: "", address: "", pincode: "" };

function validate(details, quantity, askQuantity) {
  const errors = {};
  if (!details.name.trim()) errors.name = "Please enter your name.";
  if (!isValidMobile(details.mobile)) errors.mobile = "Please enter a valid 10-digit mobile number.";
  if (details.address.trim().length < 10) errors.address = "Please enter your full address.";
  if (!isValidPincode(details.pincode)) errors.pincode = "Please enter a valid 6-digit pincode.";
  if (askQuantity) {
    const count = Number(quantity);
    if (!Number.isInteger(count) || count < 1 || count > MAX_QUANTITY) {
      errors.quantity = `Please enter a quantity from 1 to ${MAX_QUANTITY}.`;
    }
  }
  return errors;
}

// Order form for a book, a magazine issue or the yearly subscription.
// `item` is { kind, title, subtitle?, image?, price?, priceNote? }; the popup
// is open while `item` is set. The form is cleared whenever it closes.
export default function OrderDialog({ item, onClose }) {
  const [details, setDetails] = useState(emptyDetails);
  const [quantity, setQuantity] = useState("1");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | setup | failed
  const [confirmation, setConfirmation] = useState(null);

  const kind = KINDS[item?.kind] ?? KINDS.book;
  const askQuantity = item?.kind === "book";
  const count = askQuantity ? Number(quantity) || 0 : 1;
  const total = item?.price ? item.price * count : null;

  const handleChange = (field) => (event) => {
    setDetails((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleClose = () => {
    if (status === "sending") return;
    onClose();
    setDetails(emptyDetails);
    setErrors({});
    setQuantity("1");
    setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(details, quantity, askQuantity);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    const fields = {
      Item: item.subtitle ? `${item.title} (${item.subtitle})` : item.title,
      ...(askQuantity && { Quantity: count }),
      ...(item.price && { Price: `₹${item.price}${item.priceNote ? ` ${item.priceNote}` : ""}` }),
      ...(askQuantity && item.price && { Total: `₹${total}` }),
      Name: details.name.trim(),
      Mobile: details.mobile.trim(),
      Address: details.address.trim(),
      Pincode: details.pincode.trim(),
    };
    const { ok, error } = await sendToInbox(
      `${kind.subject}: ${item.title}${askQuantity ? ` × ${count}` : ""} — ${details.name.trim()}`,
      fields
    );
    if (!ok) {
      setStatus(error);
      return;
    }
    setStatus("idle");
    setQuantity("1");
    onClose();
    setConfirmation({ name: details.name.trim(), title: item.title });
    setDetails(emptyDetails);
  };

  return (
    <>
      <Dialog
        open={Boolean(item)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        aria-labelledby="order-title"
      >
        {item && (
          <>
            <DialogTitle id="order-title" sx={{ pr: 7 }}>
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
                {kind.eyebrow}
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 24,
                  color: "primary.dark",
                }}
              >
                Enter your delivery details
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
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "surface.tint",
                    }}
                  >
                    {item.image && (
                      <Box
                        component="img"
                        src={item.image}
                        alt=""
                        sx={{ width: 56, height: 72, objectFit: "cover", borderRadius: 1, flexShrink: 0 }}
                      />
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, lineHeight: 1.4 }}>{item.title}</Typography>
                      {item.subtitle && (
                        <Typography variant="body2" color="text.secondary">
                          {item.subtitle}
                        </Typography>
                      )}
                      {item.price && (
                        <Typography sx={{ mt: 0.5, fontWeight: 700, color: "primary.main" }}>
                          {askQuantity && count > 1
                            ? `₹${item.price} × ${count} = ₹${total}`
                            : `₹${item.price}/-${item.priceNote ? ` ${item.priceNote}` : ""}`}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  <TextField
                    label="Your name"
                    value={details.name}
                    onChange={handleChange("name")}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    autoComplete="name"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Mobile number"
                    value={details.mobile}
                    onChange={handleChange("mobile")}
                    error={Boolean(errors.mobile)}
                    helperText={errors.mobile}
                    autoComplete="tel"
                    slotProps={{ htmlInput: { inputMode: "tel", maxLength: 16 } }}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Delivery address"
                    value={details.address}
                    onChange={handleChange("address")}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    autoComplete="street-address"
                    multiline
                    minRows={3}
                    required
                    fullWidth
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Pincode"
                      value={details.pincode}
                      onChange={handleChange("pincode")}
                      error={Boolean(errors.pincode)}
                      helperText={errors.pincode}
                      autoComplete="postal-code"
                      slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
                      required
                      fullWidth
                    />
                    {askQuantity && (
                      <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(event) => {
                          setQuantity(event.target.value);
                          setErrors((current) => ({ ...current, quantity: undefined }));
                        }}
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity}
                        slotProps={{ htmlInput: { min: 1, max: MAX_QUANTITY, step: 1 } }}
                        required
                        fullWidth
                      />
                    )}
                  </Stack>

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
                  {status === "sending" ? "Sending…" : "Send Request"}
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>

      <SuccessDialog
        open={Boolean(confirmation)}
        title="Request sent successfully!"
        message={
          confirmation &&
          `Thank you, ${confirmation.name}! We have received your request for ${confirmation.title}. The supplier will contact you soon..!`
        }
        onClose={() => setConfirmation(null)}
      />
    </>
  );
}
