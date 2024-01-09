import json
from collections import Counter
import re

# Load the JSON data from file
with open('headlines.json', 'r') as file:
    headlines_data = json.load(file)

# Initialize a Counter to hold all word occurrences
all_words = Counter()

# Helper function to clean and split text into words
def tokenize(text):
    # Remove punctuation and split into words
    words = re.findall(r'\b\w+\b', text.lower())
    return words

# Iterate through the data and tokenize headlines
for news_source, content in headlines_data.items():
    for headline_data in content['headlines']:
        # Tokenize the headline and update the Counter
        all_words.update(tokenize(headline_data['headline']))

# Identify the top 7 most common words, excluding very common English words
common_english_words = set(['5', 'over', 's', 'amid', 'the', 'of', 'in', 'and', 'to', 'a', 'is', 'on', 'for', 'with', 'at', 'by', 'from'])
keywords = [word for word, count in all_words.most_common() if word not in common_english_words][:7]

print("Top 7 Keywords:", keywords)

# Initialize a dictionary to hold the count of each keyword by political spectrum
keyword_trends = {
    "left": {keyword: 0 for keyword in keywords},
    "centre-left": {keyword: 0 for keyword in keywords},
    "centre": {keyword: 0 for keyword in keywords},
    "centre-right": {keyword: 0 for keyword in keywords},
    "right": {keyword: 0 for keyword in keywords},
}

# Function to count keyword occurrences in headlines
def count_keywords(headlines, political_spectrum):
    for headline_data in headlines:
        headline = headline_data['headline'].lower()
        for keyword in keywords:
            if keyword in headline:
                keyword_trends[political_spectrum][keyword] += 1

# Iterate through the data and count keywords for each political spectrum
for source, data in headlines_data.items():
    political_spectrum = data["political-spectrum"]
    count_keywords(data["headlines"], political_spectrum)

# Print the results
for spectrum, counts in keyword_trends.items():
    print(f"{spectrum} Spectrum:")
    for keyword, count in counts.items():
        print(f"  {keyword}: {count}")
