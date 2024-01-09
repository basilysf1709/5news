// src/apiRoutes.ts

import { Router } from 'express';
import { HeadlinesData, KeywordTrends } from './types'; 
import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';


const router = Router();

// Route to get headlines
router.get('/getHeadlines', async (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', 'src', 'scraper', 'headlines.json'), 'utf-8');
    const headlinesData: HeadlinesData = JSON.parse(data);
    res.json(headlinesData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/getKeywords', async (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', 'src', 'scraper', 'keyword_trends.json'), 'utf-8');
    const keywordsData: KeywordTrends = JSON.parse(data);
    res.json(keywordsData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
