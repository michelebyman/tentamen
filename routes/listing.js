// get = (req, res, next) => {
//   req.models.Listing.find().then((listings) => {
//       return res.send(listings);
//     }).catch((error) => next(error));
// };

//does not work yet!!!!!!
get = (req, res, next) => {
  var query;
  console.log(req.query.city);

  if (req.query.city) {
    query = req.models.Listing.findOne({
      city: req.query.city
    });
  } else {
    query = req.models.Listing.find();
  };
  query.exec().then((property) => {
    return res.send(property);
  }).catch((error) => next(error));
};

post = (req, res, next) => {
  req.models.Listing.create({
      propertyType: req.body.propertyType,
      propertyInfo: {
        street: req.body.propertyInfo.street,
        zipCode: req.body.propertyInfo.zipCode,
        city: req.body.propertyInfo.city,
        latitude: req.body.propertyInfo.latitude,
        longitude: req.body.propertyInfo.longitude,
        priceSwedishKr: req.body.propertyInfo.priceSwedishKr,
        monthlyFeeSwedishKr: req.body.propertyInfo.monthlyFeeSwedishKr,
        bidding: req.body.propertyInfo.bidding,
      },
      description: req.body.description
    }).then((property) => {
    console.log(property);
    return res.status(201).send(property);
  }).catch((error) => next(error));
};

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((property) => {
    return res.send(property);
  }).catch((error) => next(error));
};

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id).then((deleted) => {
    if (deleted)
      return res.send(deleted).status(200);
    res.sendStatus(204);
  }).catch((error) => next(error));
};

put = (req, res, next) => {
  req.models.Listing.updateOne({
    _id: req.params.id
  }, {
    propertyType: req.body.propertyType,
      propertyInfo: {
        street: req.body.propertyInfo.street,
        zipCode: req.body.propertyInfo.zipCode,
        city: req.body.propertyInfo.city,
        latitude: req.body.propertyInfo.latitude,
        longitude: req.body.propertyInfo.longitude,
        priceSwedishKr: req.body.propertyInfo.priceSwedishKr,
        monthlyFeeSwedishKr: req.body.propertyInfo.monthlyFeeSwedishKr,
        bidding: req.body.propertyInfo.bidding,
      },
      description: req.body.description
  }, {
    new: true,
    upsert: true,
    runvalidators: true,

  }).then((status) => {
    console.log("status: ", status);
    if (status.upserted)
      res.status(201);
    else if (status.nModified)
      res.status(200);
    else
      res.status(204);
    res.send();
  }).catch((error) => next(error));
};


module.exports = {
  get,
  post, 
  getById, 
  deleteById,
  put
};