const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();



router.post("/register", async(req,res)=>{

    try{

        const {userId,eventId}=req.body;


        const existing = await Registration.findOne({
            userId,
            eventId
        });


        if(existing){

            return res.status(400).json({
                message:"Already registered"
            });

        }


        const registration = new Registration({
            userId,
            eventId
        });


        await registration.save();


        res.json({
            message:"Event registration successful"
        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

// =======================================================
// GET USER REGISTRATIONS
// =======================================================

router.get("/user/:userId", async (req, res) => {

    try {

        const registrations = await Registration.find({
            userId: req.params.userId
        }).populate("eventId");

        res.json(registrations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
// =======================================================
// GET DASHBOARD STATS
// =======================================================

router.get("/stats/:userId", async (req, res) => {

  try {

    const { userId } = req.params;

    const registeredEvents = await Registration.countDocuments({
      userId,
    });

    res.json({
      registeredEvents,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});
module.exports = router;