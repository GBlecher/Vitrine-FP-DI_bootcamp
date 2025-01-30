const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();


const userRouter = require("./routes/userRouter.js")
const postRouter = require("./routes/postRouter.js")

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
const { PORT } = process.env;
app.listen(PORT || 5001, () => {
  console.log(`run on ${PORT || 5001}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173']
  })
);



app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

