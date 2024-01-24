const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const holinfoRouter=require('./routes/Holinfo');


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/",(req,res)=>{
  return res.status(200).json(
    {success:true,
    message:" ia am working fine"}
  )
})
app.use("/api/holinfo",holinfoRouter);

app.listen(process.env.PORT, () => {
  console.log("backend is running");
});
