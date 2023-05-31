import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import {
  PlayArrow,
  Pause,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

import "./App.css";

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
      url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/4a/49/08/view-from-the-cafe.jpg",
      details:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, soluta. Velit, nihil atque. Dolores hic voluptatem quo debitis quidem ut architecto aliquam totam non veritatis veniam, eius praesentium minus ipsa similique voluptatibus ducimus neque aspernatur.",
    },
    {
      id: 3,
      title: "Title 3",
      url: "https://rishikeshdaytour.com/blog/wp-content/uploads/2019/03/13-Experiences-You-Should-ive-in-Rishikesh.jpg",
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
    <Box>
      <Grid container>
        <Grid
          item
          xs={10}
          display="flex"
          justifyContent="center"
          margin="auto"
          gap="5rem"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
          >
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].details}
              width={600}
              height={400}
              style={{ borderRadius: "30px" }}
            />
          </Box>
          <Typography variant="body1" marginTop="3rem" gutterBottom>
            <h1>{images[currentImageIndex].title}</h1>
            {images[currentImageIndex].details}
          </Typography>
        </Grid>
        <Grid item xs={10} display="flex" margin="auto">
          <Box
            display="flex"
            width={600}
            justifyContent="center"
            alignItems="center"
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
                  width="80px"
                  height="80px"
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
            border="1px solid #1976D2"
            borderRadius="100%"
            alignItems="center"
            margin="auto"
          >
            <IconButton onClick={handleSlideshowToggle}>
              {isSlideshowActive ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogViewer;
