// Import necessary types from Express
import { Request, Response, NextFunction } from 'express';

// Logging Middleware: Logs the request method and URL
export function loggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next(); // Continue to the next middleware or route handler
}

// Error Handling Middleware: Catches any errors and sends a response
export function errorHandlingMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack); // Log the error stack to the console
  res.status(500).send('Something broke!'); // Send a 500 error response
}

// You might add other middlewares like authentication, validation, etc.
