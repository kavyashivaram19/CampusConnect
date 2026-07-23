const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
// =======================================================
// SERVE UPLOADED IMAGES
// =======================================================

app.use("/uploads", express.static("uploads"));


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});


app.get("/", (req, res) => {
    res.send("CampusConnect Backend Running");
});


const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const eventRoutes = require("./routes/eventRoutes");

app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const registrationRoutes =
require("./routes/registrationRoutes");


app.use(
"/api/registrations",
registrationRoutes
);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
