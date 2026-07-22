// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

const mongoose = require("mongoose");

// =======================================================
// SECTION 2 : REGISTRATION SCHEMA
// =======================================================

const registrationSchema = new mongoose.Schema({

  // =====================================================
  // STUDENT DETAILS
  // =====================================================

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  studentName: {
    type: String,
    required: true
  },

  studentEmail: {
    type: String,
    required: true
  },

  // =====================================================
  // EVENT DETAILS
  // =====================================================

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  eventTitle: {
    type: String,
    required: true
  },

  // =====================================================
  // PAYMENT
  // =====================================================

  amountPaid: {
    type: Number,
    default: 0
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Paid"
  },
  ticketId: {

  type: String,

  unique: true,

  required: true

},
attendance: {

    type: Boolean,

    default: false

},

attendanceTime: {

    type: Date

},
  // =====================================================
  // CHECK-IN
  // =====================================================

  attendanceMarked: {
    type: Boolean,
    default: false
  },

  // =====================================================
  // REGISTRATION INFO
  // =====================================================

  registrationDate: {
    type: Date,
    default: Date.now
  }

});

// Prevent duplicate registrations
registrationSchema.index(
  { studentId: 1, eventId: 1 },
  { unique: true }
);

// =======================================================
// SECTION 3 : EXPORT
// =======================================================

module.exports = mongoose.model(
  "Registration",
  registrationSchema
);