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

        image: req.file
          ? req.file.filename
          : ""

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
// SECTION 5 : EXPORT
// =======================================================

module.exports = router;