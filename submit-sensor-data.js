const axios = require('axios');

// Replace instance URLs with Load Balancer DNS
const loadBalancerURL = "http://module5cload-2007177259.us-east-1.elb.amazonaws.com:80/"; // Use HTTP and port 80 for ALB

// Function to generate random sensor data
function generateRandomSensorData() {
    return {
        name: "Temperature Sensor",
        temperature: Math.floor(Math.random() * (40 - 10) + 10),
        address: "123 Sensor St"
    };
}

// Function to send data to the load balancer
async function sendData() {
    for (let i = 0; i < 10; i++) {
        const data = generateRandomSensorData();

        try {
            // Send data to Load Balancer (which distributes to EC2 instances)
            await axios.post(loadBalancerURL, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(`Data sent to Load Balancer:`, data);
        } catch (err) {
            console.log('Failed to send data:', err.message);
        }

        // Wait 5 seconds before next iteration
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// Call the function to start sending data
sendData();
