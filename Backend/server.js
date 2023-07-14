const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

const cookieparser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routers/userRoute");
const facultyRoute = require("./routers/facultyRoute");

dotenv.config();
const port = process.env.PORT || 4000;

// Database Connection
const connectDatabase = require("./db/conn");
connectDatabase();
// Middleware

const app = express();
app.use(cookieparser());

// app.use(
//   session({
//     secret: process.env.SECRET,
//     credentials: true,
//     name: "sid",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.ENVRONMENT === "production" ? "true" : "auto",
//       httpOnly: true,
//       expires: 1000 * 60 * 60 * 24 * 7,
//       sameSite: process.env.ENVRONMENT === "production" ? "none" : "lax",
//     },
//   })
// );

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  secure: false
}))

app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, 
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoute);
app.use("/api/faculty", facultyRoute);

app.get("/", (req, res) => {
  res.send("Done");
});

// Port Listen
app.listen(port, () => {
  console.log(`Connection is live on port number ${port}`);
});
