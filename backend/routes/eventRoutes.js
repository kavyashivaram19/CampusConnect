const express = require("express");
const Event = require("../models/Event");

const router = express.Router();


// Create Event

router.post("/create", async(req,res)=>{

    try{

        const event = new Event(req.body);

        await event.save();


        res.status(201).json({
            message:"Event created successfully",
            event
        });

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



// Get All Events

router.get("/", async(req,res)=>{

    try{

        const events = await Event.find();

        res.json(events);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = router;