const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const BookRouter = require("./routers/Book_router.js");
const UserRouter = require("./routers/auth_routes.js");
const HomeRouter = require("./routers/home_routes.js");
const adminRouter = require("./routers/admin.js");
const refrenceRouter = require("./routers/Referece_router.js");
const PORT = process.env.PORT || 5000;


connectDB();
app.use(express.json());


app.get("/", (req, res) => {
    try {
        res.status(200)
            .json({ success: true, message: "Welcome to the server" });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: error.message });
    }
});

app.get("/about", (req, res) => {
    try {
        res.status(200)
            .json({ success: true, message: "About the page" });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: error.message });
    }
})

app.use("/api/books", BookRouter);
app.use("/api/user", UserRouter);
app.use("/api/home", HomeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/reference", refrenceRouter);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


