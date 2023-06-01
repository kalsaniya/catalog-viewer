import React, { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import {
  PlayArrow,
  Pause,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

const CatalogViewer = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowActive, setSlideshowActive] = useState(false);

  const images = [
    {
      id: 1,
      title: "Title 1",
      url: "https://images.thrillophilia.com/image/upload/s--ia6bTsde--/c_fill,g_center,h_642,q_auto,w_1280/f_auto,fl_strip_profile/v1/images/photos/000/013/585/original/1594791200_shutterstock_1137990866.jpg.jpg",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, soluta. Velit, nihil atque. Dolores hic voluptatem quo debitis quidem ut architecto aliquam totam non veritatis veniam, eius praesentium minus ipsa similique voluptatibus ducimus neque aspernatur.",
    },

    {
      id: 2,
      title: "Title 2",
      url: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/2a/66/bc.jpg",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, soluta. Velit, nihil atque. Dolores hic voluptatem quo debitis quidem ut architecto aliquam totam non veritatis veniam, eius praesentium minus ipsa similique voluptatibus ducimus neque aspernatur.",
    },
    {
      id: 3,
      title: "Title 3",
      url: "https://media.istockphoto.com/id/1302237529/photo/stunning-view-of-the-ganga-river-embankment-with-the-lakshman-jhula-bridge-and-tera-manzil.jpg?s=612x612&w=0&k=20&c=LQ3Pnaegh-UXQ08ZJB_JUNHHW7333xeQUUbT8kDccEo=",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, soluta. Velit, nihil atque. Dolores hic voluptatem quo debitis quidem ut architecto aliquam totam non veritatis veniam, eius praesentium minus ipsa similique voluptatibus ducimus neque aspernatur.",
    },
  ];

  const handleSlideshowToggle = () => {
    setSlideshowActive(!isSlideshowActive);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isSlideshowActive) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [isSlideshowActive, images.length]);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setSlideshowActive(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setSlideshowActive(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setSlideshowActive(false);
  };

  return (
    <Box p={2}>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={{ xs: "40vh", sm: "40vh", md: "40vh" }}
          >
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].details}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "30px",
                textAlign: "center",
              }}
            />
          </Box>
          {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2}> */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            // ml={{ xs: 0, sm: 25 }}
          >
            <Button variant="contained" onClick={handlePrevious}>
              <NavigateBefore />
            </Button>
            {images.map((image, index) => (
              <IconButton
                key={image.id}
                onClick={() => handleThumbnailClick(index)}
                color={index === currentImageIndex ? "primary" : "default"}
                style={{
                  filter:
                    index === currentImageIndex ? "none" : "grayscale(100%)",
                }}
              >
                <img
                  src={image.url}
                  alt={image.details}
                  width="50px"
                  height="50px"
                />
              </IconButton>
            ))}
            <Button variant="contained" onClick={handleNext}>
              <NavigateNext />
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            // ml={{ xs: 0, sm: 25 }}
          >
            <IconButton onClick={handleSlideshowToggle}>
              {isSlideshowActive ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Box>
          {/* </Grid> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography
            variant="body1"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            minHeight={{ xs: "40vh", sm: "40vh", md: "40vh" }}
            marginLeft={{ xs: "16px", sm: "16px", md: "16px" }}
          >
            <h1>{images[currentImageIndex].title}</h1>
            {images[currentImageIndex].details}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogViewer;
