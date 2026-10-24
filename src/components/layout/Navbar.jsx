import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ColorModeToggle from "../common/ColorModeToggle";
import Logo from "../common/Logo";
import navItems from "../../data/navigation";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{
          bgcolor: "surface.header",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(12px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 82, gap: 2, py: 1.5 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", flexGrow: 1, minWidth: 0 }}
            >
              <Logo height={78} />

              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: { xs: 20, sm: 23 },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: "primary.dark",
                  }}
                >
                  SEED MINISTRIES
                </Typography>

                <Typography
                  sx={{
                    fontSize: 9,
                    letterSpacing: 2,
                    color: "text.secondary",
                    mt: 0.4,
                  }}
                >
                  GROWING IN HIS WORD
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={0.3}
              sx={{ alignItems: "center", display: { xs: "none", lg: "flex" } }}
            >
              {navItems.map((item) => {
                const active = pathname === item.to;

                return (
                  <Button
                    key={item.label}
                    component={RouterLink}
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    color="inherit"
                    sx={{
                      position: "relative",
                      px: 1.3,
                      fontSize: 12,
                      fontWeight: active ? 700 : 600,
                      color: active ? "primary.main" : "text.primary",
                      bgcolor: active ? "surface.tint" : "transparent",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 12,
                        right: 12,
                        bottom: 4,
                        height: 2,
                        borderRadius: 1,
                        bgcolor: "secondary.main",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.2s",
                      },
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: active ? "surface.tint" : "surface.hover",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            <Button
              variant="contained"
              component={RouterLink}
              to="/books"
              endIcon={<ArrowOutwardIcon />}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                ml: { lg: 1.5 },
                whiteSpace: "nowrap",
              }}
            >
              Explore Library
            </Button>

            <ColorModeToggle />

            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        slotProps={{ paper: { sx: { width: 290, p: 3 } } }}
      >
        <Logo height={110} sx={{ mb: 3, alignSelf: "center" }} />

        <Stack spacing={1}>
          {navItems.map((item) => {
            const active = pathname === item.to;

            return (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.to}
                onClick={closeDrawer}
                aria-current={active ? "page" : undefined}
                color="inherit"
                sx={{
                  justifyContent: "flex-start",
                  py: 1.3,
                  pl: 2,
                  borderLeft: "3px solid",
                  borderColor: active ? "primary.main" : "transparent",
                  borderRadius: "0 6px 6px 0",
                  fontWeight: active ? 700 : 600,
                  color: active ? "primary.main" : "inherit",
                  bgcolor: active ? "surface.tint" : "transparent",
                }}
              >
                {item.label}
              </Button>
            );
          })}

          <Button
            variant="contained"
            component={RouterLink}
            to="/books"
            onClick={closeDrawer}
            sx={{ mt: 2 }}
          >
            Explore Library
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
