const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = process.env.port || 9999;
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// MiddleWare
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fd87t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("ExploreNature");
        const eventTable = database.collection("Event");
        const scheduleTable = database.collection("Schedule");

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~EVENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // --------------// GET Event // ------------------------------
        app.get('/events', async (req, res) => {
            const cursor = eventTable.find({});
            const events = await cursor.toArray();
            console.log(events);
            console.log("Hitting the get API");
            res.send({ events });
        })
                    // Get Schedule 
        app.get('/schedules', async (req, res) => {
            const cursor = scheduleTable.find({});
            const schedules = await cursor.toArray();
            console.log(schedules);
            console.log("Hitting the get API Schedules");
            res.send({ schedules });
        })

        // --------------// POST an Event // ------------------------------
                    // Event post
        app.post('/events/create', async (req, res) => {
            const event = req.body;
            console.log(event);
            console.log("Hitting post API");
            const result = await eventTable.insertOne(event);
            res.json(result)
        })
                    // Schedule post
        app.post('/schedules/create', async (req, res) => {
            const schedule = req.body;
            console.log(schedule);
            console.log("Hitting post API");
            const result = await eventTable.insertOne(schedule);
            res.json(result)
        })


        // --------------// UPDATE an Event // ------------------------------
                        // Event update
        app.get('/events/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await eventTable.findOne(query);
            console.log("find" + id)
            console.log(result)
            res.send(result)
        })
        app.put('/events/:id', async (req, res) => {
            const id = req.params.id;
            const updateEvent = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    eventName: updateEvent.eventName,
                    image: updateEvent.image,
                    from: updateEvent.from,
                    destination: updateEvent.destination,
                    cost: updateEvent.cost,
                    start_date: updateEvent.start_date,
                    start_time: updateEvent.start_time,
                    end_date: updateEvent.end_date,
                    description: updateEvent.description,
                    extra: updateEvent.extra,
                }
            };
            const result = await eventTable.updateOne(filter, updateDoc, options);
            console.log("Updated")
            res.send(result)
        })

                // Schedule update
        app.get('/schedules/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await scheduleTable.findOne(query);
            console.log("find" + id)
            console.log(result)
            res.send(result)
        })
        app.put('/schedules/:id', async (req, res) => {
            const id = req.params.id;
            const updateSchedule = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    eventName: updateSchedule.eventName,
                    image: updateSchedule.image,
                    from: updateSchedule.from,
                    destination: updateSchedule.destination,
                    cost: updateSchedule.cost,
                    start_date: updateSchedule.start_date,
                    start_time: updateSchedule.start_time,
                    end_date: updateSchedule.end_date,
                    description: updateSchedule.description,
                    extra: updateSchedule.extra,
                }
            };
            const result = await scheduleTable.updateOne(filter, updateDoc, options);
            console.log("Updated")
            res.send(result)
        })


        // --------------// DELETE an Event // ------------------------------
        app.delete('/events/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await eventTable.deleteOne(query);
            console.log("deleted" + id)
            console.log(result)
            res.json(result)
        })

        app.delete('/schedules/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await scheduleTable.deleteOne(query);
            console.log("deleted" + id)
            console.log(result)
            res.json(result)
        })

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello Explore The Nature Server!!!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})