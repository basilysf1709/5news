// Importing necessary libraries and types
import express, { Express, Request, Response } from 'express';
import apiRoutes from './apiRoutes';  // Import the API routes
import { loggingMiddleware, errorHandlingMiddleware } from './middleware'; // Adjust the path as necessary

// Initialize the application
const app: Express = express();
const port: number = 8000; // or any other available port

// Parsing middleware
// You can configure express to use body-parser here
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(loggingMiddleware);
app.use(errorHandlingMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my TypeScript API!');
});

app.use('/api/v1', apiRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
