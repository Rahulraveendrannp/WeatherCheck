const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const indexRouter = require("./routes/index");
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

const app = express();

const options={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'WeatherCheck App',
      version:'1.0.0'
    },
    server:[{
      url:'http://localhost:3000/'
    }]
  },
  apis:['./routes/index.js']
}

const swaggerSpec=swaggerJSDoc(options)
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
// Log http request status
app.use(logger("dev"));
app.use(cookieParser());

app.use(cors());

// To create req object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);

// Create Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server: " + err);
  } else {
    console.log(`Listening on port ` + PORT);
  }
});
