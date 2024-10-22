const express = require('express');
const {MongoClient, ServerApiVersion} = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


//==============================================
//MongoDb connection
//==============================================
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qcso25z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let db;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


  async function run() {
    try {
      
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