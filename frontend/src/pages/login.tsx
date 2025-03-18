import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box, Container, Grid, TextField, Button, Typography, Checkbox, Link, CircularProgress } from "@mui/material";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
      console.log("API_URL:", API_URL);

      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      console.log("Login Response:", response.data); 

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", email);
        toast.success("Login successful! Redirecting...", { autoClose: 2000 });
        setTimeout(() => router.push("/Homepage"), 2000);
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message); 

      if (error.response) {
        toast.error(error.response.data.message || "Login failed. Check credentials.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 4, mb: 6 }}>
        <Grid container spacing={2} alignItems="center"> 
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: 0,
                boxShadow:"none",
                backgroundColor: "transparent",
                maxWidth: "400px", 
                margin: "0 auto", 
                minHeight: "500px", 
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#002776", mb: 2 }}>
                Hello!
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Enter email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ mb: 3, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#002776", borderWidth: 2 } } }}
                />
                <TextField
                  fullWidth
                  label="Enter password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 3, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#002776", borderWidth: 2 } } }} 
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox sx={{ color: "#002776" }} />
                    <Typography variant="body2">Remember me</Typography>
                  </Box>
                  <Link href="/forgot-password" variant="body2" sx={{ color: "#002776" }}>
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "#002776", color: "#fff", mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Log in"}
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <img src="/robot.png" alt="Robot" style={{ maxWidth: "100%", height: "auto" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <ToastContainer />
    </Box>
  );
};

export default LoginPage;