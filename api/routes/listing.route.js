import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// RESTful route structure
router.post("/", verifyToken, createListing);              // Create
router.get("/", getListings);                              // List (query filters supported)
router.get("/:id", getListing);                            // Read single listing
router.put("/:id", verifyToken, updateListing);            // Update
router.delete("/:id", verifyToken, deleteListing);         // Delete

export default router;
