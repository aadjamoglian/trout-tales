import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as catches from './catches-model.mjs';
import { body, ExpressValidator, validationResult } from 'express-validator';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;
const RESPONSE_404 = {"Error": "Not found"}
const RESPONSE_400 = {"Error": "Invalid request"}

app.listen(PORT, async () => {
    await catches.connect(true)
    console.log(`Server listening on port ${PORT}...`);
});