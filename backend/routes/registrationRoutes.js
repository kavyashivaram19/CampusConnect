// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const User = require("../models/User");

const router = express.Router();

// =======================================================
// REGISTER FOR EVENT
// =======================================================

router.post("/register", async (req, res) => {

  try {

    const { userId, eventId } = req.body;

    // ===============================
    // GET STUDENT
    // ===============================

    const student = await User.findById(userId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // ===============================
    // GET EVENT
    // ===============================

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    // ===============================
    // ALREADY REGISTERED?
    // ===============================

    const existing = await Registration.findOne({
      studentId: userId,
      eventId: eventId
    });

    if (existing) {
      return res.status(400).json({
        message: "Already Registered"
      });
    }

    // ===============================
    // CHECK SEATS
    // ===============================

    const totalRegistrations = await Registration.countDocuments({
      eventId
    });

    if (totalRegistrations >= event.maxParticipants) {
      return res.status(400).json({
        message: "Event is Full"
      });
    }

    // ===============================
    // SAVE REGISTRATION
    // ===============================

    // ===================================
// GENERATE UNIQUE TICKET ID
// ===================================

const ticketId =
  "CC-" +
  Date.now() +
  "-" +
  Math.floor(Math.random() * 1000);

// ===================================
// SAVE REGISTRATION
// ===================================

const registration = new Registration({

  studentId: student._id,

  studentName: student.name,

  studentEmail: student.email,

  eventId: event._id,

  eventTitle: event.title,

  amountPaid: event.registrationFee,

  paymentStatus: "Paid",

  ticketId

});

    await registration.save();

    res.json({

  message: "Registration Successful",

  registration,

  ticketId

});

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
// =======================================================
// GET USER REGISTRATIONS
// =======================================================

router.get("/user/:userId", async (req, res) => {

  try {

    const registrations = await Registration.find({

      studentId: req.params.userId

    }).populate("eventId");

    res.json(registrations);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

// =======================================================
// DASHBOARD STATS
// =======================================================

router.get("/stats/:userId", async (req, res) => {

  try {

    const registeredEvents =
      await Registration.countDocuments({

        studentId: req.params.userId

      });

    res.json({

      registeredEvents

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});
// =======================================================
// COORDINATOR DASHBOARD
// =======================================================
router.get("/coordinator/:coordinatorId", async (req, res) => {

    try {

        const events = await Event.find({
            createdBy: req.params.coordinatorId
        });

        const dashboard = [];

        for (const event of events) {

            const registrations = await Registration.countDocuments({
                eventId: event._id
            });

            dashboard.push({

                eventId: event._id,
                title: event.title,
                image: event.image,
                category: event.category,
                registrationFee: event.registrationFee,
                maxParticipants: event.maxParticipants,
                
                registrations,

                revenue:
                    registrations * event.registrationFee,

                seatsLeft:
                    event.maxParticipants - registrations,
                
                coordinatorEmail:
                    event.coordinatorEmail

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
// GET PARTICIPANTS OF AN EVENT
// =======================================================

router.get("/participants/:eventId", async (req, res) => {

    try {

        const participants = await Registration.find({

            eventId: req.params.eventId

        });

        res.json(participants);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
// =======================================================
// MARK ATTENDANCE
// =======================================================

router.post("/attendance", async (req, res) => {

    try {

        const { ticketId } = req.body;

        const registration = await Registration.findOne({

            ticketId

        });

        if (!registration) {

            return res.status(404).json({

                message: "Invalid Ticket"

            });

        }

        if (registration.attendance) {

            return res.status(400).json({

                message: "Attendance Already Marked"

            });

        }

        registration.attendance = true;

        registration.attendanceTime = new Date();

        await registration.save();

        res.json({

            message: "Attendance Marked Successfully",

            registration

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
// =======================================================
// EXPORT
// =======================================================

module.exports = router;