// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

const express = require("express");
const Event = require("../models/Event");
const upload = require("../middleware/upload");

const router = express.Router();

// =======================================================
// SECTION 2 : CREATE EVENT
// =======================================================

router.post(
  "/create",
  upload.single("image"),
  async (req, res) => {

    try {

      const event = new Event({

    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
    venue: req.body.venue,

    registrationFee: req.body.registrationFee,
    maxParticipants: req.body.maxParticipants,

    createdBy: req.body.createdBy,
    coordinatorName: req.body.coordinatorName,
    coordinatorEmail: req.body.coordinatorEmail,

    image: req.file ? req.file.filename : ""

});

      await event.save();

      res.status(201).json({

        message: "Event created successfully",
        event

      });

    }
    catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

  }
);

// =======================================================
// SECTION 3 : GET ALL EVENTS
// =======================================================

router.get("/", async (req, res) => {

  try {

    const events = await Event.find();

    res.json(events);

  }
  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

// =======================================================
// SECTION 4 : GET SINGLE EVENT
// =======================================================

router.get("/:id", async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({

        message: "Event not found"

      });

    }

    res.json(event);

  }
  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

// =======================================================
// SECTION 5 : UPDATE EVENT
// =======================================================

router.put(
  "/update/:id",
  upload.single("image"),
  async (req, res) => {

    try {

      const event = await Event.findById(req.params.id);

      if (!event) {

        return res.status(404).json({

          message: "Event not found"

        });

      }

      event.title = req.body.title;
      event.description = req.body.description;
      event.category = req.body.category;
      event.date = req.body.date;
      event.venue = req.body.venue;

      if (req.file) {

        event.image = req.file.filename;

      }

      await event.save();

      res.json({

        message: "Event updated successfully",
        event

      });

    }
    catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

  }
);

// =======================================================
// SECTION 6 : DELETE EVENT
// =======================================================

router.delete("/delete/:id", async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({

        message: "Event not found"

      });

    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({

      message: "Event deleted successfully"

    });

  }
  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});
// =======================================================
// UPDATE EVENT
// =======================================================

router.put(

  "/update/:id",

  upload.single("image"),

  async (req, res) => {

    try {

      const updatedData = {

        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        venue: req.body.venue

      };

      if (req.file) {

        updatedData.image = req.file.filename;

      }

      const event = await Event.findByIdAndUpdate(

        req.params.id,

        updatedData,

        {

          new: true

        }

      );

      res.json({

        message: "Event Updated Successfully",

        event

      });

    }

    catch (error) {

      res.status(500).json({

        message: error.message

      });

    }

  }

);
// =======================================================
// DELETE EVENT
// =======================================================

router.delete("/:id", async (req, res) => {

  try {

    await Event.findByIdAndDelete(req.params.id);

    res.json({

      message: "Event Deleted Successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});
// =======================================================
// GET COORDINATOR DASHBOARD
// =======================================================

const Registration = require("../models/Registration");

router.get("/dashboard/:coordinatorId", async (req, res) => {

  try {

    const events = await Event.find({

      createdBy: req.params.coordinatorId

    });

    const dashboard = [];

    for (const event of events) {

      const registrations = await Registration.find({

        eventId: event._id

      });

      dashboard.push({

        eventId: event._id,

        title: event.title,

        image: event.image,

        date: event.date,

        venue: event.venue,

        registrationFee: event.registrationFee,

        totalRegistrations: registrations.length,

        revenue:
          registrations.length *
          event.registrationFee,

        seatsLeft:
          event.maxParticipants -
          registrations.length

      });

    }

    res.json(dashboard);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});
// =======================================================
// DELETE EVENT
// =======================================================

router.delete("/delete/:id", async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {

      return res.status(404).json({
        message: "Event not found"
      });

    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event deleted successfully"
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
// =======================================================
// SECTION 7 : EXPORT
// =======================================================

module.exports = router;