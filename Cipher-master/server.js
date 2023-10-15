const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:8100', // Replace with your frontend's origin
  credentials: true,
}));

app.get('/image', async (req, res) => {
  try {
    const imageUrl = req.query.imageUrl;
    console.log('Requested Image URL:', imageUrl); // Debugging statement
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    console.log('Response Content Type:', contentType); // Debugging statement

    res.set('Access-Control-Allow-Origin', 'http://localhost:8100'); // Replace with your frontend's origin
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Content-Type', contentType);
    console.log('Response Data:', response.data); // Debugging statement
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
  console.log(`Proxy server listening at http://localhost:${port}`);
});
