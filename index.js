const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


//==============================================
//MongoDb connection
//==============================================
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qcso25z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// const leads = [
//     { id: 1, name: "John Doe", email: "john@example.com", source: "Facebook" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", source: "Google" }
// ];

async function run() {
    try {
        await client.connect();
        const leadsDB = client.db('ezyMetricsDB');


// POST route for inserting a lead
        app.post('/leads', async (req, res) => {
            try {
                const lead = req.body;
                const result = await leadsDB.collection('leads').insertOne(lead);
                res.status(201).json({ insertedId: result.insertedId });
            } catch (error) {
                res.status(500).json({ error: 'Failed to insert lead' });
            }
        });

 // GET route for fetching all leads
        app.get('/leads', async (req, res) => {
            try {
                const leads = await leadsDB.collection('leads').find().toArray();
                res.json(leads);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to fetch leads' });
            }
        });



        //  ===================
        //  ===================
        console.log("You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

//==============================================
//Testing Route
//==============================================
app.get('/', (req, res) => {
    res.send('EzyMetrics API is running');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})