const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/models', (req, res) => {
    const modelsPath = path.join(__dirname, 'public', 'models');
    fs.readdir(modelsPath, (err, files) => {
        if (err) {
            res.status(500).send('Error reading models directory');
            return;
        }
        res.json(files);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
