const express = require("express");
const route = express.Router({ mergeParams: true });
const Review = require('../models/review');
const ExpressError = require("../utils/ExpressError");
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');
const review = require('../controllers/reviews');


route.post('/', isLoggedIn, validateReview, catchAsync(review.createReview));

route.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview));


module.exports = route;