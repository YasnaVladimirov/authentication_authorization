const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./models");
const cookieParser = require("cookie-parser");
const { verifyJWT } = require("./middleware/verifyJWT");

const cors = require("cors");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));


//routes
const registerRouter = require("./routes/registerRoute");
app.use("/register", registerRouter);
const authRouter = require("./routes/authRoute");
app.use("/login", authRouter);
const refreshTokenRouter = require("./routes/refreshTokenRoute");
app.use("/refresh", refreshTokenRouter);
const logoutRouter = require("./routes/logoutRoute");
app.use("/logout", logoutRouter);


app.use(verifyJWT);
const userRouter = require("./routes/userRoute");
app.use("/users", userRouter);


const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
  })
}).catch((err) => {
  console.log("Error running server, " + err);
})