const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
    try {
        const headers = req.headers["authorization"];
        const token = headers && headers.split(" ")[1];
        if (!token) {
            return res.status(401)
                .json({ success: false, message: "Unauthorized User" });
        }
        //verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401)
                .json({ success: false, message: "Unauthorized User" });
        }
        req.userInfo = decodedToken;
        console.log(decodedToken);
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: "Some Error Ocurred" });
    }

    next();
}

module.exports = authmiddleware;

