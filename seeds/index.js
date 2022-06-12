const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '6285d310df425323d968f64f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
            price,
            description: '    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto autem quia amet nisi distinctio, temporibus minus accusantium delectus consequuntur dignissimos et. Doloribus rem quas blanditiis enim aliquam reiciendis error distinctio.',
            images: [
                {
                    fieldname: 'image',
                    originalname: 'federico-beccari-eGJg5iRGlg8-unsplash Small.jpeg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    url: 'https://res.cloudinary.com/dx05ki1sx/image/upload/v1653061789/YelpCamp/rao9fqkjqljk3qfwsjzv.jpg',
                    size: 7179,
                    filename: 'YelpCamp/rao9fqkjqljk3qfwsjzv'
                },
                {
                    fieldname: 'image',
                    originalname: 'federico-beccari-eGJg5iRGlg8-unsplash.jpg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    url: 'https://res.cloudinary.com/dx05ki1sx/image/upload/v1653061792/YelpCamp/yhvfplxvjugfze77zqju.jpg',
                    size: 2062690,
                    filename: 'YelpCamp/yhvfplxvjugfze77zqju'
                }
            ]
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});



