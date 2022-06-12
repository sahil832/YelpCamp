const Campground = require('./models/campground');
const Review = require('./models/review');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campgrounds = await Campground.findById(id);
    if (!campgrounds.author._id.equals(req.user._id)) {
        req.flash('error', 'You are not allowed to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author._id.equals(req.user._id)) {
        req.flash('error', 'You are not allowed to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


module.exports.validateCampground = (req, res, next) => {
    const result = campgroundSchema.validate(req.body);
    if (result.error) {
        const err = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(err, 400);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        const err = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(err, 400);
    } else {
        next();
    }
}