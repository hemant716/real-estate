import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    await listing.deleteOne();
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const {
      limit = 9,
      startIndex = 0,
      offer = 'any',
      furnished = 'any',
      parking = 'any',
      type = 'all',
      searchTerm = '',
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    const filter = {
      name: { $regex: searchTerm, $options: 'i' },
      offer: offer === 'true' ? true : offer === 'false' ? false : { $in: [true, false] },
      furnished: furnished === 'true' ? true : furnished === 'false' ? false : { $in: [true, false] },
      parking: parking === 'true' ? true : parking === 'false' ? false : { $in: [true, false] },
      type: type === 'all' ? { $in: ['sale', 'rent'] } : type,
    };

    const listings = await Listing.find(filter)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip(parseInt(startIndex))
      .limit(parseInt(limit));

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};


