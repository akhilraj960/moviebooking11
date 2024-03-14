import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import Image from "../assets/imgz.jpg";
import styled from "@emotion/styled";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Background = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Image})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token != null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movie/scheduledmovies")
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      });
  }, []);

  const handleBookTicket = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/bookticket/${id}`);
    }
  };

  return (
    <>
      <Background>
        <h1 style={{ color: "white" }}>Welcome to Amigo Cinemazz</h1>
        <Link to="/bookings">Book your show</Link>
      </Background>

      <Typography
        variant="div"
        maxWidth={"1200px"}
        margin={"auto"}
        marginTop={"80px"}
        marginBottom={"100px"}
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={"20px"}
      >
        {movies.map((value, index) => {
          return (
            <Card
              key={index}
              style={{ width: "300px" }}
              sx={{ maxWidth: "260px" }}
            >
              <CardMedia
                sx={{ height: "360px" }}
                image={`http://localhost:5000/uploads/${value.movieInfo._id}.jpg`}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {value.movieInfo.name}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {value.movieInfo.director}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {value.dateandtime}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {value.movieInfo.genre}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {value.movieInfo.language}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleBookTicket(value._id)}
                  fullWidth
                  size="small"
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Typography>
    </>
  );
};

export default Home;
