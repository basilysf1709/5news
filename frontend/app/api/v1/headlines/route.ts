import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'headlines.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const headlinesData = JSON.parse(data);

    return new Response(JSON.stringify(headlinesData), {
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
