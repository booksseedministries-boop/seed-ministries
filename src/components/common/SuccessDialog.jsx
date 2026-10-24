import { Box, Button, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

// Small confirmation popup shown after a form has been sent.
export default function SuccessDialog({ open, title, message, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="success-title">
      <DialogContent>
        <Stack spacing={1.5} sx={{ alignItems: "center", textAlign: "center", py: 2 }}>
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: "surface.tint",
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 48, color: "primary.main" }} />
          </Box>
          <Typography
            id="success-title"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 24,
              color: "primary.dark",
            }}
          >
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {message}
          </Typography>
          <Button variant="contained" onClick={onClose} sx={{ mt: 1, minWidth: 120 }}>
            OK
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
