import mongoose from 'mongoose';
import 'dotenv/config';

const CATCHES_DB_NAME = 'catches_db';
const CATCHES_COLLECTION = 'catches';
const CATCH_CLASS = 'Catch';

let connection = undefined;
let Catch = undefined;

/**
 * This function does the following:
 *  1. Connects to the MongoDB server.
 *  2. Drop CATCHES_COLLECTION if asked to do so.
 *  3. Creates a model class for the exercise schema.
 * @param {Boolean} dropCollection If true, drop EXERCISE_COLLECTION
 */
async function connect(dropCollection){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {dbName: CATCHES_DB_NAME});
        connection = mongoose.connection;
        if (dropCollection) {
            await connection.db.dropCollection(CATCHES_COLLECTION);
        }
        Catch = createModel();
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel() {
    const catchSchema = mongoose.Schema({
        date: {type: Date, required: true, default: Date.now},
        species: {type: String, required: true},
        weight: {type: Number, required: true, min: 0},
        length_in: {type: Number, required: true, min: 0},
        bait: {type: String, required: true},
        story: {type: String, required: true},
        location: {
            type: {
                type: String, 
                enum: ['Point'], // Must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number], // Array of numbers: [lng, lat]
                required: true
            }}
    })
    return mongoose.model(CATCH_CLASS, catchSchema);
}

async function createCatch(date, species, weight, length_in, bait, story, location) {
    const catchh = new Catch({date: date, species: species, weight: weight, length_in: length_in, bait: bait, story: story, location: location});
    return catchh.save()
}

async function findCatches(filter) {
    const query = Catch.find(filter);
    return query.exec();
}


export { connect, createModel, createCatch, findCatches}