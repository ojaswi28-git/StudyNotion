const express = require("express");
const app = express();

// Routers
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments")


const {dbConnect} = require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Connect to database
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"https://study-notion-by-ojaswi.vercel.app",
		credentials:true,
	})
);

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
}))

// cloudinary connection
cloudinaryConnect();

// Mount routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);


// Default Route
app.get("/", (req, res)=>{
    res.json({
        success: true,
        message: "Your Server is up and running..."
    })
})

app.listen(PORT, ()=>{
    console.log(`Your app is running at ${PORT}`);
})
