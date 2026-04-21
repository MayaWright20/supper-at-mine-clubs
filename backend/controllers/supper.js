import { asyncError } from "../middleware/error.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";
import { Supper } from "../models/supper.js";
import ErrorHandler from "../utils/error.js";

export const createSupper = asyncError(async (req, res, next) => {
  const { name, description, availableSeats, price } = req.body;

  if (!name || !description || !availableSeats || !price) {
    return next(
      new ErrorHandler(
        "Please provide name, description, price and how many seats are available",
        400
      )
    );
  }

  const uploadedImages = req.files?.length
    ? await Promise.all(
        req.files.map((file) =>
          uploadImageToCloudinary({
            buffer: file.buffer,
            folder: "supper-at-mine-clubs/suppers",
            mimetype: file.mimetype,
          })
        )
      )
    : [];

  const supper = await Supper.create({
    name,
    description,
    availableSeats,
    price: price || 0,
    images: uploadedImages.map((image) => image.secureUrl),
    createdBy: req.user._id,
    attendies: [],
  });

  res.status(201).json({
    success: true,
    message: "Supper created successfully",
    supper,
  });
});

export const getAllSuppers = asyncError(async (req, res, next) => {
  const allSuppers = await Supper.find();

  res.status(200).json({
    success: true,
    allSuppers,
  });
});

export const getSupper = asyncError(async (req, res, next) => {
  const supper = await Supper.findById(req.supper._id);

  res.status(200).json({
    success: true,
    supper,
  });
});
