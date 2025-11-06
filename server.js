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

  let packages = [
[{
    "_id":1,
    "vehicle_type": "pontoon",
    "teir": "gold",
    "interior_services": ["Seats washed with soap and water.", "All compartments cleaned out and washed", "Deck of boat pressure washed", "Any mold / mildew removed.", "Bimini cleaned with soap and water.", "Gloss fiberglass / waxable surfaces waxed."],
    "exterior_services": ["All exposed dirt / grime pressure washed off.", "Side walls washed with ph-neutral soap.", "Side-walls waxed", "Pontoons acid washed"],
    "starting_price": 400,
    "images": ["pontoons/gold/acid.jpeg", "pontoons/gold/console.jpeg", "pontoons/gold/engine.jpeg", "pontoons/gold/overview.jpeg", "pontoons/gold/seats.jpeg", "pontoons/gold/wax.jpeg"]
}

,{
    "_id":2,
    "vehicle_type": "pontoon",
    "teir": "silver",
    "interior_services": ["Seats washed with soap and water.", "All compartments cleaned out and washed", "Deck of boat pressure washed", "Any mold / mildew removed.", "Bimini cleaned with soap and water."],
    "exterior_services": ["All exposed dirt / grime pressure washed off.", "Side walls washed with ph-neutral soap.", "Pontoons acid washed"],
    "starting_price": 300,
    "images": ["pontoons/silver/bimini.jpeg", "pontoons/silver/compartments.png", "pontoons/silver/deck.jpeg", "pontoons/silver/exterior-bronze1.jpeg", "pontoons/silver/exterior-bronze2.jpeg", "pontoons/silver/seats-noBleach.png"]
}

,{
    "_id":3,
    "vehicle_type": "pontoon",
    "teir": "bronze",
    "interior_services": ["Seats washed with soap and water.", "All compartments cleaned out and washed", "Deck of boat pressure washed"],
    "exterior_services": ["All exposed dirt / grime pressure washed off.", "Side walls washed with ph-neutral soap."],
    "starting_price": 250,
    "images": ["pontoons/silver/compartments.png", "pontoons/silver/deck.jpeg", "pontoons/silver/exterior-bronze1.jpeg", "pontoons/silver/exterior-bronze2.jpeg", "pontoons/silver/seats-noBleach.png"]
}

,{
    "_id":4,
    "vehicle_type": "haul",
    "teir": "gold",
    "interior_services": ["Seats washed with soap and water.", "All compartments cleaned out and washed", "Deck of boat pressure washed", "Any mold / mildew removed.", "Bimini cleaned with soap and water.", "Gloss fiberglass / waxable surfaces waxed.", "Carper / SeaDeck scrubbed and cleaned."],
    "exterior_services": ["All exposed dirt / grime pressure washed off.", "Haul washed with ph-neutral soap.", "Haul waxed and polished."],
    "starting_price": 400,
    "images": ["hauls/bronze/overview-deck-boat.jpeg", "hauls/bronze/overview.jpeg", "hauls/silver/bimini.jpeg", "hauls/silver/seats.jpeg", "hauls/gold/after.jpeg", "hauls/gold/before.jpeg", "hauls/gold/orange-overview.jpeg", "hauls/gold/wax.jpeg"]
    
}

,{
    "_id":5,
    "vehicle_type": "haul",
    "teir": "silver",
    "interior_services": ["Seats washed with soap and water.", "All compartments cleaned out and washed", "Deck of boat pressure washed", "Any mold / mildew removed.", "Bimini cleaned with soap and water."],
    "exterior_services": ["All exposed dirt / grime pressure washed off.", "Haul washed with ph-neutral soap."],
    "starting_price": 300,
    "images": ["hauls/bronze/overview-deck-boat.jpeg", "hauls/bronze/overview.jpeg", "hauls/silver/bimini.jpeg", "hauls/silver/seats.jpeg"]
}

,{
    "_id":6,
    "vehicle_type": "haul",
    "teir": "bronze",
    "interior_services": ["Seats washed with soap and water.", "All compartments cleaned out and washed", "Deck of boat pressure washed"],
    "exterior_services": ["All exposed dirt / grime pressure washed off."],
    "starting_price": 250,
    "images": ["hauls/bronze/overview-deck-boat.jpeg", "hauls/bronze/overview.jpeg"]
}

,{
    "_id":7,
    "vehicle_type":"passenger_vehicle",
    "teir": "silver",
    "interior_services": ["Leather seats: Wiped down and cleaned.", "Cloth Seats: Gently scrubed and vacummed.", "All plastics whiped down and dusted.", "Carpets vacummed and gently scrubbed.", "Floor mats cleaned.", "Windows cleaned."],
    "exterior_services": ["Exterior wash.", "Wheels and tired washed and dressed.", "Windows cleaned", "Truck bed pressure washed"],
    "starting_price": 250,
    "images": ["automotive/silver/back-seats.jpeg", "automotive/silver/dash.jpeg", "automotive/silver/driver-dash.jpeg", "automotive/silver/exterior1.jpeg", "automotive/silver/exterior2.jpeg", "automotive/silver/passenger-dash.jpeg", "automotive/silver/truck.jpeg", "automotive/silver/wheels.jpeg"]
}

,{
    "_id":8,
    "vehicle_type":"passenger_vehicle",
    "teir": "gold",
    "interior_services": ["Leather seats: Wiped down and cleaned.", "Cloth Seats: Extracted and vaccumed", "All plastics whiped down and dusted.", "Carpets vacummed and extracted", "Floor mats cleaned.", "Windows cleaned."],
    "exterior_services": ["Exterior wash and waxed.", "Wheels and tired washed and dressed.", "Truck bed pressure washed and scrubbed.", "Windows cleaned.", "Engine bay cleaned and dressed."],
    "starting_price": 350,
    "images": ["automotive/silver/back-seats.jpeg", "automotive/silver/dash.jpeg", "automotive/silver/driver-dash.jpeg", "automotive/silver/exterior1.jpeg", "automotive/silver/exterior2.jpeg", "automotive/silver/passenger-dash.jpeg", "automotive/silver/truck.jpeg", "automotive/silver/wheels.jpeg"]
}





]
];

app.get("/api/packages", (req, res) => {
    res.send(packages);
});

app.listen(3001, () => {
});