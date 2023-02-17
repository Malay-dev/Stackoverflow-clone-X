import express from "express";

import { getLocation } from "../controllers/location.js";

const locationRoutes = express.Router();
locationRoutes.get("/get", getLocation);

export default locationRoutes;
