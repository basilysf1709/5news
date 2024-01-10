import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'keyword_trends.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const trendData = JSON.parse(data);

    return new Response(JSON.stringify(trendData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
