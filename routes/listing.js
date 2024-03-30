const express=require("express");
const router= express.Router();
const Listing=require("../models/listing.js");
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const User= require("../models/user.js");
const {isLoggedIn, isOwner,validateListing}= require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });


//  post(isLoggedIn,validateListing,wrapAsync(listingController.createListing));
//  router.route("/").get(wrapAsync(listingController.index)).post(upload.single("listing[image]"), (req,res)=>{
//     res.send(req.file);
//     console.log(req.file);
// });

// router.route("/")
//   .get(wrapAsync(listingController.index))
//   .post(upload.single("listing[image]"), async (req, res) => {
//     try {
//       // File upload successful, you can now handle the uploaded file
//       console.log(req.file);
//       res.send(req.file);
//     } catch (error) {
//       // Handle error
//       console.error(error);
//       res.status(500).send("Error uploading file");
//     }
//   });



router
   .route("/")
       .get(wrapAsync(listingController.index))
   .post(
        isLoggedIn,
        upload.single("listing[image]"), 
        
        
        wrapAsync(listingController.createListing)
    );



router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id").get( wrapAsync(listingController.showListing)).put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing,wrapAsync(listingController.updateListing)).delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));



// Show Route



// Create Route


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));

//Update Route


//Delete Route


module.exports=router;