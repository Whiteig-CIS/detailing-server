const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
app.use(express.static("public")); // uses the public directory
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
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
      "/test.png"
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
      "/test.png"
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
      "/test.png"
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
      "/test.png"
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
      "/test.png"
    ],
    "summary": "The Gold Auto Detail provides a complete deep clean and wax for your vehicle, restoring both interior and exterior surfaces to a premium, polished finish.",
     "preview_image": "2a.jpeg"
  }
]
;

app.get("/api/packages", (req, res) => { //Get All Packages
    res.send(packages);
});

/*
app.get("/api/houses/:id", (req, res)=>{ //Get Specific Packages at a Given index
    const house = houses.find((house)=>house._id === parseInt(req.params.id));
    res.send(house);
}); */

app.listen(3001, () => {
});