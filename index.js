

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;


const cors = require("cors");

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));
  


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");


db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err);
  });



app.use("/status" , require("./routes/StatusRoute"))
app.use("/user" , require("./routes/userRoute"))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});