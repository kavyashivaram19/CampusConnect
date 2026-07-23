// =======================================================
// IMPORTS
// =======================================================

const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const router = express.Router();

// =======================================================
// DASHBOARD STATS
// =======================================================

router.get("/dashboard", async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalEvents =
      await Event.countDocuments();

    const totalRegistrations =
      await Registration.countDocuments();

    const attendanceMarked =
      await Registration.countDocuments({

        attendance: true

      });

    const pendingAttendance =
      await Registration.countDocuments({

        attendance: false

      });

    const registrations =
      await Registration.find();

    let totalRevenue = 0;

    registrations.forEach((reg) => {

      totalRevenue += reg.amountPaid;

    });

    res.json({

      totalUsers,
      totalEvents,
      totalRegistrations,
      totalRevenue,
      attendanceMarked,
      pendingAttendance

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