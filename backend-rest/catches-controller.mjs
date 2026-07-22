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



app.post('/catches', asyncHandler ( async (req, res, next) => {
    try {
        let newCatch = await catches.createCatch(req.body.date, req.body.species, req.body.weight, req.body.length_in, req.body.bait, req.body.story, req.body.location);

        if (req.body.weight <= 0) {
            throw new Error("Weight in lbs must be greater than 0!")
        }

        if (req.body.length_in <= 0) {
            throw new Error("Length in inches must be greater than 0!")
        }

        let coordinates = req.body.location.coordinates
        if (coordinates.length === 0) {
            throw new Error("Empty coordinates!");
        } else if (coordinates.length === 1) {
            throw new Error("Need lat and long coordinates!")
        }

        res.status(201).type('application/json').send(newCatch);
    } catch (error) {
        console.log(error)
        res.status(400).type('application/json').send(RESPONSE_400)
    }
}))

app.get('/catches', asyncHandler ( async (req, res, next) => {
    const allCatches = await catches.findCatches(req.query);
    res.status(200).type('application/json').send(allCatches);
}))

app.get('/catches/:id', asyncHandler( async (req, res) => {
    const catchById = await catches.findCatches({_id: req.params.id})
    if (catchById.length > 0) {
        res.status(200).type('application/json').send(catchById[0])
    } else {
        res.status(404).type('application/json').send(RESPONSE_404)
    }
}))

app.put('/catches/:id', asyncHandler( async (req, res) => {
    let catchById = await catches.findCatches({_id: req.params.id})
    if (catchById.length > 0) {
        try {
            if (
                req.body.weight <= 0 ||
                req.body.length_in <= 0
            ) {
                throw new Error("Invalid Request")
            } else {
                const result = await catches.updateCatch({_id: req.params.id}, req.body)
                catchById = await catches.findCatches({_id: req.params.id})
                res.status(200).type('application/json').send(catchById[0])
            }
        } catch (error) {
            res.status(400).type('application/json').send(RESPONSE_400);
        }
    } else {
        res.status(404).type('application/json').send(RESPONSE_404);
    }
}))

app.delete('/catches/:id', asyncHandler( async (req, res) => {
    let deletedCount = await catches.deleteCatchById(req.params.id);
    if (deletedCount > 0) {
        res.status(204).type('application/json').send();
    } else {
        res.status(404).type('application/json').send(RESPONSE_404);
    }
}))