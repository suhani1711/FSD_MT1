
const express = require('express');

const app = express();

app.use(express.json());

// Initial Data
let registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 3,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 1,
        paymentStatus: "Paid"
    }
];

// Home Route
app.get('/', (req, res) => {
    res.send("Event Registration API is Running!");
});



// GET all registrations
app.get('/api/registrations', (req, res) => {
    res.status(200).json(registrations);
});


// POST new registration
app.post('/api/registrations', (req, res) => {

    const { participantName, eventName, department, ticketCount, paymentStatus } = req.body;

    // Validation
    if (!participantName || !eventName || !department ||
        !Number.isInteger(ticketCount) || ticketCount <= 0 ||
        !["Paid", "Pending"].includes(paymentStatus)) {

        return res.status(400).json({
            message: "Invalid input data"
        });
    }

    // Generate new ID
    const newRegistration = {
        id: registrations.length > 0
            ? Math.max(...registrations.map(r => r.id)) + 1
            : 501,
        participantName,
        eventName,
        department,
        ticketCount,
        paymentStatus
    };

    registrations.push(newRegistration);

    res.status(201).json({
        message: "Registration added successfully",
        registration: newRegistration
    });
});



// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
