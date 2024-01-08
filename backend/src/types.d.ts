// src/types.d.ts

// Represents a single headline item
export interface Headline {
  headline: string;  // Changed from title to headline to match JSON structure
  url: string;
}

// Represents the collection of headlines and additional details for a news source
export interface NewsSource {
  'political-spectrum': string;
  headlines: Headline[];
}

// Represents the complete structure of headlines.json, where each key is a news source name
export interface HeadlinesData {
  [source: string]: NewsSource; // Index signature for dynamic keys like "Indiatimes", "NDTV", etc.
}
