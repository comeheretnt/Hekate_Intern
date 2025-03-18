import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box, Container, Grid, TextField, Button, Typography, CircularProgress } from "@mui/material";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email });

      toast.success("Password reset email sent! Please check your inbox.", { autoClose: 2000 });
    } catch (error) {
      console.error("Error sending reset password email:", error);
      toast.error("Failed to send password reset email. Please try again.");
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
                boxShadow: 'none',
                backgroundColor: "transparent",
                textAlign: "center",
                maxWidth: "400px",
                margin: "0 auto",
                minHeight: "500px",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#002776", mb: 2 }}>
                Forgot Password
              </Typography>
              <form onSubmit={handleForgotPassword}>
                <TextField
                  fullWidth
                  label="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ mb: 3, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#002776", borderWidth: 2 } } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "#002776", color: "#fff", mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
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

export default ForgotPasswordPage;