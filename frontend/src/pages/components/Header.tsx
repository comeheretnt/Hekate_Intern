import { AppBar, Toolbar, Typography, Button, IconButton, Container, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userName, setUserName] = useState("");
  const open = Boolean(anchorEl);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName("");
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
    { label: "Services", path: "/services" },
    { label: "Success Stories", path: "/success-stories" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", px: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#002776", ml: -2 }}>
            hekate
          </Typography>

          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                href={item.path}
                color="inherit"
                sx={{
                  border: router.pathname === item.path ? "2px solid #002776" : "none",
                  borderRadius: "20px",
                  color: "#002776",
                  fontWeight: router.pathname === item.path ? "bold" : "normal",
                  backgroundColor: router.pathname === item.path ? "#f0f0f0" : "transparent"
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton>
              <LanguageIcon sx={{ color: "#002776" }} />
            </IconButton>
            {userName ? (
              <>
                <Button
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  variant="contained"
                  sx={{
                    backgroundColor: "#002776",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 3
                  }}
                >
                  {userName}
                </Button>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ 'aria-labelledby': 'user-button' }}
                >
                  <MenuItem onClick={handleLogout} sx={{ color: "#002776" }}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{
                  backgroundColor: "#002776",
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 3
                }}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}