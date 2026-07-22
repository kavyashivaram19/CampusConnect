// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

const mongoose = require("mongoose");

// =======================================================
// SECTION 2 : USER SCHEMA
// =======================================================

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // =====================================================
  // USER ROLE
  // =====================================================

  role: {
    type: String,
    enum: ["student", "coordinator", "admin"],
    default: "student"
  }

});

// =======================================================
// SECTION 3 : EXPORT
// =======================================================

module.exports = mongoose.model("User", userSchema);