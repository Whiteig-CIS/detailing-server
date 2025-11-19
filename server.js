const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
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

// post

app.post("/api/packages",
  // match your form field names; adjust if you only have one:
  upload.fields([
    { name: "BeforeImg", maxCount: 1 },
    { name: "AfterImg", maxCount: 1 }, //TODO add prev image and allow multiple before/afyer
  ]),
  (req, res) => {
    try {
      console.log("✅ Reached POST /api/packages");
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      const toArray = (v) =>
        Array.isArray(v) ? v : (v !== undefined && v !== null ? [v] : []);

      // normalize incoming fields
      const interior_services = toArray(req.body.interior_services);
      const exterior_services = toArray(req.body.exterior_services);

      // build the object you actually want to validate
      const candidate = {
        vehicle_type: req.body.vehicle_type,
        teir: req.body.teir, // or switch everything to 'tier'
        starting_price: Number(req.body.starting_price),
        summary: req.body.summary,
        interior_services,
        exterior_services,
      };

      const { error, value } = validatePackage(candidate);
      if (error) {
        console.log("❌ Joi validation error:", error);
        return res.status(400).send(error.details?.[0]?.message || "Invalid input");
      }

      const pkg = {
        _id: String(packages.length),
        ...value,
        images: "",
        preview_image: "",
        before_image: req.files?.BeforeImg?.[0]?.filename || null,
        after_image: req.files?.AfterImg?.[0]?.filename || null,
      };

      packages.push(pkg);
      return res.status(200).json(pkg);
    } catch (err) {
      console.error("💥 Server crashed:", err);
      return res.status(500).send("Internal Server Error");
    }
  }
);


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