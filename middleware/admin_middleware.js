const adminMiddleware = (req,res,next) => {
    try {
        if(req.userInfo.role !== "admin"){
            return res.status(403).json({success: false, message: "Forbidden"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500)
        .json({success: false, message:error.message});
    }
}


module.exports = adminMiddleware;