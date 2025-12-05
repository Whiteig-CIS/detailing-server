const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public")); 
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/portfolio/");
  },
  filename: (req, file, cb) => {
    // Keep the original filename logic for storage
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect("mongodb+srv://I_White:Saftey_Glasses_76!@iggys-detailing-cluster.c1s7urr.mongodb.net/")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const packageSchema = new mongoose.Schema({
  teir: String,
  vehicle_type: String,
  starting_price: Number,
  summary: String,
  interior_services: [String],
  exterior_services: [String],
  images: [[String]],
  preview_image: String
});

const PackageDB = mongoose.model("Package", packageSchema);

// Helper function to convert to array
const toArray = (v) =>
  Array.isArray(v) ? v : (v !== undefined && v !== null ? [v] : []);

app.get("/api/packages", async (req, res) => { //Get All Packages
  const packages = await PackageDB.find();
  res.send(packages);
});

app.get("/api/packages/:id", async (req, res) => {
  const pkg = await PackageDB.findOne({ _id: req.params.id });
  if (!pkg) return res.status(404).send("Package not found");
  res.send(pkg);
});

// post
app.post("/api/packages", upload.array("images", 20), async (req, res) => {
  req.body.interior_services = toArray(req.body.interior_services);
  req.body.exterior_services = toArray(req.body.exterior_services);

  const result = validatePackage(req.body);

  if (result.error) {
    console.log(result);
    res.status(400);
    return;
  }

  const pkg = new PackageDB({
    vehicle_type: req.body.vehicle_type,
    teir: req.body.teir,
    starting_price: req.body.starting_price,
    summary: req.body.summary,
    interior_services: req.body.interior_services,
    exterior_services: req.body.exterior_services,
  });

  if (req.files) {
    let toImages = [];
    if (req.files.length !== 0) {

      pkg.preview_image = req.files[1].filename;
      console.log(req.files[1].filename);

      for (let i = 0; i < req.files.length; i++) {
        let pairIndex = Math.floor(i / 2);
        if (!toImages[pairIndex]) {
          toImages[pairIndex] = [];
        }

        if (i % 2 === 0) {
          toImages[pairIndex][0] = req.files[i].filename;
        } else {
          toImages[pairIndex][1] = req.files[i].filename;
        }
      }
      console.log(toImages);
    }
    pkg.images = toImages;
  }
  else {
    console.log("files not found");
  }

  const newPackage = await pkg.save();
  res.status(200).send(newPackage);
});



app.put("/api/packages/:id", upload.any(), async (req, res) => {

  //  Validation and basic fields update
  req.body.interior_services = toArray(req.body.interior_services);
  req.body.exterior_services = toArray(req.body.exterior_services);

  const result = validatePackage(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    console.log(result.error);
    return;
  }

  let feildsToUpdate = {
    teir: req.body.teir,
    vehicle_type: req.body.vehicle_type,
    starting_price: req.body.starting_price,
    summary: req.body.summary,
    interior_services: req.body.interior_services,
    exterior_services: req.body.exterior_services
  }

  // Handle Image Updates
  if (req.files && req.files.length > 0) {
    // Find the existing package to get current images
    const existingPackage = await PackageDB.findById(req.params.id);
    if (!existingPackage) {
      return res.status(404).send("Package not found");
    }

    // Create a copy of the existing images array
    let updatedImages = existingPackage.images || [];

    // Process new files from the client
    req.files.forEach(file => {
      // Expected field names are: new_image_pair_X_before or new_image_pair_X_after
      const fieldParts = file.fieldname.split('_');

      if (fieldParts.length === 5 && fieldParts[0] === 'new' && fieldParts[1] === 'image' && fieldParts[2] === 'pair') {

        const pairIndex = parseInt(fieldParts[3]); // X
        const slot = fieldParts[4]; // before or after

        if (!isNaN(pairIndex)) {
          // Ensure the pair array exists for this index
          if (!updatedImages[pairIndex]) {
            updatedImages[pairIndex] = [];
          }

          // Determine the slot index (0 for before, 1 for after)
          const slotIndex = (slot === 'before') ? 0 : 1;

          // Replace the old filename with the new filename
          updatedImages[pairIndex][slotIndex] = file.filename;
        }
      }
    });

    // Add the updated images array to the fields to be updated
    feildsToUpdate.images = updatedImages;
    // Note: You might also want logic here to update the preview_image if needed
  }

  //  Perform the Database Update
  const wentThrough = await PackageDB.updateOne(
    { _id: req.params.id },
    feildsToUpdate
  );

  if (wentThrough.nModified === 0 && wentThrough.n === 0) {
    return res.status(404).send("Package not found or no changes were made");
  }

  const updatedPackage = await PackageDB.findOne({ _id: req.params.id });
  res.status(200).send(updatedPackage);
});

app.delete("/api/packages/:id", async (req, res) => {
  const pkg = await PackageDB.findByIdAndDelete(req.params.id);
  res.status(200).send(pkg);
});


const validatePackage = (pkg) => {
  const schema = Joi.object({
    _id: Joi.any().optional(),
    starting_price: Joi.number().min(0).max(1000).required(),
    summary: Joi.string().min(3).required(),
    teir: Joi.string().min(3).required(),
    vehicle_type: Joi.string().min(3).required(),
    interior_services: Joi.array().items(Joi.string().min(1)).min(1).required(),
    exterior_services: Joi.array().items(Joi.string().min(1)).min(1).required(),
  });
  return schema.validate(pkg);
};

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
