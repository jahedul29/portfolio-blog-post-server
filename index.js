import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import authRouter from './routes/authRoute.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';

const PORT = process.env.PORT || 3000;

//CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.urlencoded({extended: false}));

// MIDDLEWARES
app.use(logger);
app.use(errorHandler);

//ROUTES
app.get("/", (req, res)=> {
    res.status(200).json({
        "success" : true,
        "message" : "Welcome to blog post"
    })
})

app.use('/api/v1/auth', authRouter);

//MONGOOSE SETUP
mongoose.connect(process.env.MONGO_URL).then(()=> {
    app.listen(PORT, () => {
        console.log(`Server connected to PORT:${PORT}`);
    })
}).catch((err)=> {
    console.log({err});
    console.log("Server did not connected to the database");
})


