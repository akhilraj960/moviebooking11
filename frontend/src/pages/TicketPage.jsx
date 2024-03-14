import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Typography,
} from "@mui/material";

const TicketPage = () => {
  const [tickets, setTickets] = useState({});

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movie/bookedtickets/${id}`)
      .then((response) => {
        console.log(response.data[0].seats);

        setTickets(response.data[0].seats);
      })
      .catch((error) => {
        console.error("Error fetching booked tickets:", error);
      });
  }, [id]);

  const handleSubmit = () => {
    axios
      .put(`http://localhost:5000/api/movie/booking/${id}/${token}`, {
        tickets,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        navigate(`/`);
      })
      .catch((error) => {
        console.error("Error submitting tickets:", error);
        // Handle error
      });
  };

  const handleCheckboxChange = (seat) => {
    setTickets((prevTickets) => ({
      ...prevTickets,
      [seat]: {
        ...prevTickets[seat],
        status: !prevTickets[seat].status,
        user: !prevTickets[seat].status ? token : null,
      },
    }));
  };

  return (
    <div>
      <Toolbar />
      <Typography
        variant="div"
        maxWidth="700px"
        margin="auto"
        display="flex"
        flexDirection="column"
        gap="1rem"
      >
        <Box display="flex" flexDirection="row" flexWrap={"wrap"}>
          {Object.keys(tickets).map((seat) => (
            <>
              {tickets[seat].status === true ? (
                <FormControlLabel
                  key={seat}
                  label={` ${seat}`}
                  control={
                    <Checkbox
                      color="error"
                      checked={tickets[seat].status}
                      // onChange={() => handleCheckboxChange(seat)}
                    />
                  }
                />
              ) : (
                <FormControlLabel
                  key={seat}
                  label={` ${seat}`}
                  control={
                    <Checkbox
                      color="primary"
                      checked={tickets[seat].status}
                      onChange={() => handleCheckboxChange(seat)}
                    />
                  }
                />
              )}
            </>
          ))}
        </Box>

        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Typography>
    </div>
  );
};

export default TicketPage;
