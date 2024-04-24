import express from "express";
import cors from "cors";
import helmet from "helmet";
import { dbConnection } from "./config/dbConnection.js";
import router from "./app/router.js"


const app = express();
const port = 5000;
dbConnection(app, port);

// CORS configuration
const whitelist = ['https://noporata.onrender.com', 'http://localhost:5157',"http://localhost:4173"];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the requested origin is in the whitelist or is undefined (same origin).
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// express middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads/"));

router(app);