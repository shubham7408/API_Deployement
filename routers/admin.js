const express = require("express");
const authmiddleware = require("../middleware/auth_middleware");
const adminMiddleware = require("../middleware/admin_middleware.js");
const router = express.Router();

router.get("/Welcome", authmiddleware,adminMiddleware, (req,res) => {
    try {
        res.status(200).send("Welcome to the admin page");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Some Error Ocurred" });
    }
});

module.exports = router;