const express = require('express');
const route = express.Router();
//const methodOverride = require('method-override');
//const ejsMate = require('ejs-mate');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campground');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

//SEE CAMPGROUNDS
route.get('/', isLoggedIn, catchAsync(campgrounds.index));

//ADDING NEW CAMPGROUND THROUGH FORM
route.get('/new', isLoggedIn, campgrounds.renderNewFrom);

route.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCampground));
// route.post('/', upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
// })

//CAMPGROUNDS BY ID
route.get('/:id', catchAsync(campgrounds.showCampground));

//EDIT CAMPGROUND BY ID
route.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

route.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))

route.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = route;