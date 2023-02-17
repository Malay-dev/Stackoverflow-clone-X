import mongoose from "mongoose";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        dob: user.dob,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
        location: user.location,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User not available...");
  }
  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          name: req?.body?.Name,
          about: req?.body?.About,
          dob: req?.body?.Dob,
          tags: req?.body?.Tags,
          location: req?.body?.location,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
