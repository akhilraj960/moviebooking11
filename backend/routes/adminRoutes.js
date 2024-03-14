const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Seat = require("../models/Seat");
const User = require("../models/User");
const Schedule = require("../models/Schedule");

router.get("/users", (req, res) => {
  User.find().then((users) => {
    res.send(users);
  });
});

router.get("/tickets/:mid", (req, res) => {
  Seat.aggregate([
    {
      $match: {
        movie: new mongoose.Types.ObjectId(req.params.mid),
      },
    },
  ]).then((data) => {
    res.send(data);
  });
});

router.get('/bookedtickets',(req,res)=>{
  Schedule.aggregate([
    {
      $match:{
        
      }
    }
  ])
})

module.exports = router;
