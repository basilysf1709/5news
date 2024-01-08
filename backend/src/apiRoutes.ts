// src/apiRoutes.ts

import { Router } from 'express';
import { HeadlinesData } from './types'; 
import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';


const router = Router();

// Route to get headlines
router.get('/getHeadlines', async (req: Request, res: Response) => {
  try {
    // Assuming the scraper writes to headlines.json in the scraper folder
    const data = fs.readFileSync(path.join(__dirname, '..', 'src', 'scraper', 'headlines.json'), 'utf-8');
    const headlinesData: HeadlinesData = JSON.parse(data);

    // Send the headlines as a response
    res.json(headlinesData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
