mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    propertyType: String,
        propertyInfo: {
            street: {
                type: String,
                // this is how you do required fields
                // require: true
            },

            zipCode: String,
            city: String,
            latitude: Number,
            longitude: Number,
            priceSwedishKr: Number,
            monthlyFeeSwedishKr: Number,
            bidding: Boolean
        },
        description: String,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;