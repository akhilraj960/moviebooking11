const { default: mongoose, mongo } = require("mongoose");

const scheduleSchema = mongoose.Schema(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
    dateandtime: {
      type: Date,
    },
    seats: {
      type: Object,
      default: Array.from({ length: 40 }, (_, index) => ({
        [`s${index + 1}`]: {
          user: null,
          status: false,
        },
      })).reduce((acc, obj) => ({ ...acc, ...obj }), {}),
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
