const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// MongoDB connection string with provided username and password
const serveraddress = 'mongodb+srv://arshsure:rEu0Ubwtmy9M1IUk@module5c.rkkrp.mongodb.net/?retryWrites=true&w=majority&appName=module5c';

// Connect to MongoDB
mongoose.connect(serveraddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Define the schema for sensor readings
const sensorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    time: { type: Date, default: Date.now },
    temperature: { type: Number, required: true }
});

// Create the sensor model
const Sensor = mongoose.model('Sensor', sensorSchema);

// Initialize Express app
const app = express();
const port = 3000;

app.use(bodyParser.json());

// GET: Retrieve all sensor readings
app.get('/', async (req, res) => {
    try {
        const sensors = await Sensor.find({});
        res.json(sensors);
    } catch (error) {
        res.status(500).send('Error retrieving sensor readings: ' + error);
    }
});

// GET: Retrieve sensor reading by ID
app.get('/:id', async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (sensor) {
            res.json(sensor);
        } else {
            res.status(404).send('Sensor reading not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving sensor reading: ' + error);
    }
});

// POST: Submit a new sensor reading
app.post('/', async (req, res) => {
    try {
        // Create a new sensor reading
        const newSensor = new Sensor({
            name: req.body.name || "Temperature Sensor",
            address: req.body.address || "123 Sensor St",
            temperature: req.body.temperature || Math.floor(Math.random() * 30) + 10
        });

        // Save the new reading
        await newSensor.save();
        res.status(201).send('Sensor reading added.');
    } catch (error) {
        res.status(500).send('Error saving sensor reading: ' + error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API running on port ${port}`);
});
