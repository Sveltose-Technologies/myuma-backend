import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/dbConfig.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
// import cookieParser from "cookie-parser";

import auth from "./routes/auth.routes.js";
import logo from "./routes/logo.routes.js";
import homeBanner from "./routes/homeBanner.routes.js";
import blog from "./routes/blog.routes.js";
import blogCategory from "./routes/blogCategory.routes.js";
import pricing from "./routes/pricing.routes.js";
import comment from "./routes/comment.router.js";
import category from "./routes/category.routes.js";
import newListing from "./routes/newListing.routes.js";
import aboutUs from "./routes/aboutUs.routes.js";
import termcondition from "./routes/termcondition.routes.js";
import privacyPolicy from "./routes/privacyPolicy.routes.js";
import footer from "./routes/footer.routes.js"
import contactus from "./routes/contactUs.routes.js"
import booknow from "./routes/bookNow.routes.js"
import rating from "./routes/rating.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

// app.use(cors({
//     origin: ["https://frontlaw.rxchartsquare.com/"], // 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   }));
  
app.use(cors());
// app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json("API is Running...");
});


// Routes
app.use("/auth", auth);
app.use("/logo", logo);
app.use("/home-banner", homeBanner);
app.use("/blog-category", blogCategory);
app.use("/blog", blog);
app.use("/pricing", pricing);
app.use("/comment", comment);
app.use("/category", category);
app.use("/newListing", newListing);
app.use("/aboutus", aboutUs);
app.use("/termcondition", termcondition);
app.use("/privacy-policy",privacyPolicy );
app.use("/footer-text", footer);
app.use("/contactus", contactus);
app.use("/booknow",booknow );
app.use("/rating", rating)

app.listen(PORT, () => {
  console.log(`server is running at PORT: http://localhost:${PORT}`.bgBlue.black);
});