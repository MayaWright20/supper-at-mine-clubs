import { asyncError } from "../middleware/error.js";
import { Supper } from "../models/supper.js";
import ErrorHandler from "../utils/error.js";

export const createSupper = asyncError(async (req, res, next) => {
  const { name, description, availableSeats, price, images } = req.body;

  if (!name || !description || !availableSeats || !price) {
    return next(
      new ErrorHandler(
        "Please provide name, description, price and how many seats are available",
        400
      )
    );
  }
  console.log("in create supper");

  const supper = await Supper.create({
    name,
    description,
    availableSeats,
    price: price || 0,
    images: images || [],
    createdBy: req.user._id,
    attendies: [],
  });

  res.status(201).json({
    success: true,
    message: "Supper created successfully",
    supper,
  });
});

export const getSupper = asyncError(async (req, res, next) => {
  const supper = await Supper.findById(req.supper._id);

  console.log("in get supper");

  res.status(200).json({
    success: true,
    supper,
  });
});
