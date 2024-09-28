import express, { Request, Response } from 'express';

const app = express();

// Define a route for the dashboard
app.get('/', (req: Request, res: Response): void => {
    res.send("TODO: Dashboard");
});

// Function to start the dashboard server
const startDashboard = (port: number = 3000): void => {
    app.listen(port, () => {
        console.log(`Dashboard is running on port ${port}`);
    });
};

// Export the startDashboard function
export { startDashboard };
