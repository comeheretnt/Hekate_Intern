import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Container, Grid, TextField, Button, Typography, CircularProgress } from "@mui/material";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setToken(router.query.token as string || null);
    }
  }, [router.isReady, router.query.token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!token) {
      toast.error("Invalid or expired token.");
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
      await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });

      toast.success("Password reset successful! Redirecting to login...", { autoClose: 2000 });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toast.error("Password reset failed. Please try again.");
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
                boxShadow: "none",
                backgroundColor: "transparent",
                textAlign: "center",
                maxWidth: "400px",
                margin: "0 auto",
                minHeight: "500px",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#002776", mb: 2 }}>
                Reset Password
              </Typography>
              {!token ? (
                <Typography variant="body1" sx={{ color: "red" }}>
                  Invalid or expired reset link.
                </Typography>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <TextField
                    fullWidth
                    label="Enter new password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 3, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#002776", borderWidth: 2 } } }}
                  />
                  <TextField
                    fullWidth
                    label="Confirm new password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {loading ? <CircularProgress size={24} /> : "Reset Password"}
                  </Button>
                </form>
              )}
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

export default ResetPasswordPage;