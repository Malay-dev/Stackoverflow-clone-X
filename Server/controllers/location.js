import users from "../models/auth.js";
import mongoose from "mongoose";
import axios from "axios";

export const getLocation = async (req, res) => {
  try {
    const data = await axios.get(process.env.LOCATION_URL);
    let tmp = {
      country: data?.data.country,
      state: data?.data.region,
      city: data?.data.city,
    };
    res.status(200).json(tmp);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
