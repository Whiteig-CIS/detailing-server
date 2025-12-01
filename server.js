const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const { after } = require("node:test");
app.use(express.static("public")); // uses the public directory
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/portfolio/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

let packages =
  [
    {
      "_id": "1",
      "vehicle_type": "boat",
      "teir": "bronze",
      "interior_services": [
        "Seats washed with soap and water.",
        "All compartments cleaned out and washed.",
        "Deck of boat pressure washed."
      ],
      "exterior_services": [
        "All exposed dirt and grime pressure washed off.",
        "Boat sides washed with pH-neutral soap."
      ],
      "starting_price": 250,
      "images": [
        ["18a.jpeg", "18b.jpeg"], ["19a.jpeg", "19b.jpeg"], ["20a.jpeg", "20b.jpeg"], ["16a.jpeg", "16b.jpeg"], ["17a.jpeg", "17b.jpeg"], ["15a.jpeg", "15b.jpeg"]
      ],
      "summary": "Our Bronze Boat Detail offers an essential interior and exterior wash to remove dirt, grime, and buildup, leaving your vessel clean and refreshed for the water.",
      "preview_image": "14a.jpeg"
    },
    {
      "_id": "2",
      "vehicle_type": "boat",
      "teir": "silver",
      "interior_services": [
        "Seats washed with soap and water.",
        "All compartments cleaned out and washed.",
        "Deck of boat pressure washed.",
        "Any mold or mildew removed.",
        "Bimini cleaned with soap and water."
      ],
      "exterior_services": [
        "All exposed dirt and grime pressure washed off.",
        "Boat sides washed with pH-neutral soap."
      ],
      "starting_price": 300,
      "images": [
        ["18a.jpeg", "18b.jpeg"], ["19a.jpeg", "19b.jpeg"], ["20a.jpeg", "20b.jpeg"], ["16a.jpeg", "16b.jpeg"], ["17a.jpeg", "17b.jpeg"], ["15a.jpeg", "15b.jpeg"]
      ],
      "summary": "The Silver Boat Detail provides a deeper clean including mildew removal, bimini cleaning, and a full interior refresh for a polished, like-new finish.",
      "preview_image": "18a.jpeg"
    },
    {
      "_id": "3",
      "vehicle_type": "boat",
      "teir": "gold",
      "interior_services": [
        "Seats washed with soap and water.",
        "All compartments cleaned out and washed.",
        "Deck of boat pressure washed.",
        "Any mold or mildew removed.",
        "Bimini cleaned with soap and water.",
        "Carpet or SeaDeck scrubbed and cleaned.",
        "Gloss fiberglass and waxable surfaces waxed."
      ],
      "exterior_services": [
        "All exposed dirt and grime pressure washed off.",
        "Boat sides washed with pH-neutral soap.",
        "Boat exterior waxed and polished."
      ],
      "starting_price": 400,
      "images": [
        ["18a.jpeg", "18b.jpeg"], ["19a.jpeg", "19b.jpeg"], ["20a.jpeg", "20b.jpeg"], ["16a.jpeg", "16b.jpeg"], ["17a.jpeg", "17b.jpeg"], ["15a.jpeg", "15b.jpeg"]
      ],
      "summary": "Our Gold Boat Detail delivers a premium inside-and-out service with waxing, polishing, and full interior restoration to bring your boat to showroom quality.",
      "preview_image": "10a.jpeg"
    },
    {
      "_id": "4",
      "vehicle_type": "auto",
      "teir": "silver",
      "interior_services": [
        "Leather seats wiped down and cleaned.",
        "Cloth seats gently scrubbed and vacuumed.",
        "All plastics wiped down and dusted.",
        "Carpets vacuumed and gently scrubbed.",
        "Floor mats cleaned.",
        "Windows cleaned."
      ],
      "exterior_services": [
        "Exterior wash.",
        "Wheels and tires washed and dressed.",
        "Windows cleaned.",
        "Truck bed pressure washed."
      ],
      "starting_price": 250,
      "images": [
        ["18a.jpeg", "18b.jpeg"], ["19a.jpeg", "19b.jpeg"], ["20a.jpeg", "20b.jpeg"], ["16a.jpeg", "16b.jpeg"], ["17a.jpeg", "17b.jpeg"], ["15a.jpeg", "15b.jpeg"]
      ],
      "summary": "Our Silver Auto Detail includes a thorough interior cleaning and an exterior wash to leave your car looking spotless and refreshed, inside and out.",
      "preview_image": "3a.jpeg"
    },
    {
      "_id": "5",
      "vehicle_type": "auto",
      "teir": "gold",
      "interior_services": [
        "Leather seats wiped down and cleaned.",
        "Cloth seats extracted and vacuumed.",
        "All plastics wiped down and dusted.",
        "Carpets vacuumed and extracted.",
        "Floor mats cleaned.",
        "Windows cleaned."
      ],
      "exterior_services": [
        "Exterior wash and wax.",
        "Wheels and tires washed and dressed.",
        "Truck bed pressure washed and scrubbed.",
        "Windows cleaned.",
        "Engine bay cleaned and dressed."
      ],
      "starting_price": 350,
      "images": [
        ["18a.jpeg", "18b.jpeg"], ["19a.jpeg", "19b.jpeg"], ["20a.jpeg", "20b.jpeg"], ["16a.jpeg", "16b.jpeg"], ["17a.jpeg", "17b.jpeg"], ["15a.jpeg", "15b.jpeg"]
      ],
      "summary": "The Gold Auto Detail provides a complete deep clean and wax for your vehicle, restoring both interior and exterior surfaces to a premium, polished finish.",
      "preview_image": "2a.jpeg"
    }
  ]
  ;

app.get("/api/packages", (req, res) => { //Get All Packages
  res.send(packages);
});

app.get("/api/packages/:id", (req, res) => {
    const pkg = packages.find(p => p._id == req.params.id);

    if (!pkg) {
        return res.status(404).send("Package not found");
    }

    res.send(pkg);
});

// post

app.post("/api/packages", upload.array("images", 20), (req, res) => {

  const toArray = (v) => // Helper function to convert to array
    Array.isArray(v) ? v : (v !== undefined && v !== null ? [v] : []);

  req.body.interior_services = toArray(req.body.interior_services); // convert these to Arrays because Joi expects one
  req.body.exterior_services = toArray(req.body.exterior_services);

  const result = validatePackage(req.body);

  if (result.error) { // If there is a validation error
    console.log(result);
    res.status(400);
    return;
  }



  const newPackage = { //construct the new package with all the non-file elements
    _id: packages.length,
    vehicle_type: req.body.vehicle_type,
    teir: req.body.teir,
    starting_price: req.body.starting_price,
    summary: req.body.summary,
    interior_services: req.body.interior_services,
    exterior_services: req.body.exterior_services,
  }

  if (req.files) { // seperate before and after photos
    let toImages = [];
    if (req.files.length !== 0) {

      newPackage.preview_image = req.files[1].filename; // setting the preview image to the first before picture for now.

      for (let i = 0; i < req.files.length; i++) {
        let pairIndex = Math.floor(i / 2); // group into pairs by divide by n and floor trick

        // create the pair array if not already made
        if (!toImages[pairIndex]) {
          toImages[pairIndex] = [];
        }

        // even index = before, odd index = after
        if (i % 2 === 0) {
          toImages[pairIndex][0] = req.files[i].filename;
        } else {
          toImages[pairIndex][1] = req.files[i].filename;
        }
      }

      console.log(toImages);

    }
    newPackage.images = toImages;
  }
  else {
    console.log("files not found");
  }

  packages.push(newPackage);
  res.status(200).send(newPackage);

});

app.put("/api/packages/:id", upload.array("images", 20), (req, res) => {
  console.log("------- Made it to PUT");
  let pkg = packages.find(p => p._id == req.params.id);
  console.log(pkg);

  if(!pkg) {
    res.status(400).send("Pakage not found");
    console.log("-------233");
  }

  result = validatePackage(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    console.log("-------240");
    console.log(result);
    return;
  }  

  pkg.vehicle_type = req.body.vehicle_type;
  pkg.teir = req.body.teir;
  pkg.starting_price = req.body.starting_price;
  pkg.summary = req.body.summary;
  // Assuming these fields are arrays/objects that are correctly handled by the update
  pkg.interior_services = req.body.interior_services; 
  pkg.exterior_services = req.body.exterior_services;

  res.send(pkg);
  



});


const validatePackage = (pkg) => {
  const schema = Joi.object({
    _id: Joi.any().optional(),
    starting_price: Joi.number().min(0).max(1000).required(),
    summary: Joi.string().min(3).required(),
    teir: Joi.string().min(3).required(),       // or use 'tier' everywhere
    vehicle_type: Joi.string().min(3).required(),
    interior_services: Joi.array().items(Joi.string().min(1)).min(1).required(),
    exterior_services: Joi.array().items(Joi.string().min(1)).min(1).required(),
  });
  return schema.validate(pkg);
};

app.listen(3001, () => {
});