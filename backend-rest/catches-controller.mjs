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

app.post('/catches', asyncHandler (async (req, res, next) => {

    try {
        let newCatch = await catches.createCatch(req.body.date, req.body.species, req.body.weight, req.body.length_in, req.body.bait, req.body.story, req.body.location);
        res.status(201).type('application/json').send(newCatch);
    } catch (error) {
        console.log(error)
        res.status(400).type('application/json').send(RESPONSE_400)
    }

}))