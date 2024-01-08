import schedule from 'node-schedule';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Define a function to run the scraper
async function runScraper() {
  console.log('Running the scraper...');
  try {
    const { stdout } = await execAsync('python3 ../scraper/main.py'); // Adjust path if necessary
    console.log(`Scraper finished: ${stdout}`);
  } catch (error) {
    console.error(`Error occurred in scraper: ${error}`);
  }
}

// Schedule the scraper to run every day at midnight
schedule.scheduleJob('0 0 * * *', runScraper);

// Also run the scraper on server start
runScraper();

export default runScraper;
