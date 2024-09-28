const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("TODO: Dashboard");
});

const startDashboard = (port = 3000) => {
    app.listen(port, () => {
        console.log(`Dashboard is running on port ${port}`);
    });
};

module.exports = { startDashboard };