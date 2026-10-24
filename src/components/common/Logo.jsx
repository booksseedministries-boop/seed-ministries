import { Box } from "@mui/material";

import logo from "../../assets/logo.webp";

export default function Logo({ height = 48, sx }) {
  return (
    <Box
      component="img"
      src={logo}
      alt="Seed Ministries"
      sx={{ height, width: "auto", flexShrink: 0, ...sx }}
    />
  );
}
