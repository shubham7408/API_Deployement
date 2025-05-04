const express = require("express");
const authmiddleware = require("../middleware/auth_middleware");
const router = express.Router();

router.get("/", authmiddleware, (req, res) => {
    try {
        res.status(200)
            .send("Welcome to the home page");
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: "Some Error Ocurred" });
    }
});

module.exports = router;