import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  CircularProgress,
  Grid,
} from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Homepage: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/news/getAllNews"
        );
        setNews(response.data);
        console.log("Fetched news:", response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          mt: 4,
          mb: 6,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ mb: 4 }}>
          <img src="/robot2.png" alt="Robot 2" style={{ width: "100%", marginBottom: "16px", borderRadius: "8px" }} />
          <img src="/robot3.png" alt="Robot 3" style={{ width: "100%", marginBottom: "16px", borderRadius: "8px" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img src="/robot4.png" alt="Robot 4" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <img src="/robot5.png" alt="Robot 5" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <img src="/robot6.png" alt="Robot 6" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant="h5" 
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#002776",
            textAlign: "left", 
            ml: { xs: 0, sm: 2 }, 
          }}
        >
          AI News Around the World
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : news.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "gray",
              mt: 4,
            }}
          >
            No news available at the moment.
          </Typography>
        ) : (
          <Box
            sx={{
              overflow: "visible", 
              px: { xs: 0, sm: 2 },
              width: "100%",
            }}
          >
            <Slider {...sliderSettings}>
              {news.map((item) => (
                <Box key={item._id} sx={{ px: 1 }}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      minHeight: "450px", 
                      maxHeight: "450px", 
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        item.image_url || "https://via.placeholder.com/300"
                      }
                      alt={item.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          whiteSpace: "nowrap", 
                          overflow: "hidden", 
                          textOverflow: "ellipsis", 
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Date: {item.date}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#333",
                          mt: 1,
                          overflow: "hidden", 
                          textOverflow: "ellipsis", 
                          display: "-webkit-box",
                          WebkitLineClamp: 3, 
                          WebkitBoxOrient: "vertical", 
                        }}
                      >
                        {item.content || "No content available."}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Link
                          href={item.link}
                          target="_blank"
                          sx={{ fontWeight: "bold", color: "#002776" }}
                        >
                          Read More
                        </Link>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            color: "gray",
                            fontStyle: "italic",
                            overflow: "hidden",
                            textOverflow: "ellipsis", 
                            display: "-webkit-box", 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: "vertical", 
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default Homepage;