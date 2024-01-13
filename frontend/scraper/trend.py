import json
from collections import Counter
import re
import os

# Load the JSON data from file
public_dir_path = os.path.join(os.path.dirname(__file__), '..', 'public')

# Ensure that the public directory exists
os.makedirs(public_dir_path, exist_ok=True)

# Define the path for the headlines.json file in the public directory
headlines_file_path = os.path.join(public_dir_path, 'headlines.json')

# Load the JSON data from the headlines.json file
try:
    with open(headlines_file_path, 'r') as file:
        headlines_data = json.load(file)
except FileNotFoundError:
    print("headlines.json file not found.")
    headlines_data = {} 

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
common_english_words = set(['after', '5', 'over', 's', 'amid', 'the', 'of', 'in', 'and', 'to', 'a', 'is', 'on', 'for', 'with', 'at', 'by', 'from', 'as', 'will', 'all', 'be', 'says', 'this', 't', 'no'])
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

keyword_trends_file_path = os.path.join(public_dir_path, 'keyword_trends.json')

with open(keyword_trends_file_path, 'w') as json_file:
    json.dump(keyword_trends, json_file, indent=4)

# Print the results
for spectrum, counts in keyword_trends.items():
    print(f"{spectrum} spectrum:")
    for keyword, count in counts.items():
        print(f"  {keyword}: {count}")

# Initialize a dictionary to hold the count of each keyword by political spectrum group
keyword_trends = {
    "left": Counter(),
    "right": Counter(),
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
    spectrum = data["political-spectrum"]
    group = "left" if spectrum in ["left", "centre-left"] else "right" if spectrum in ["right", "centre-right"] else None
    if group:
        count_keywords(data["headlines"], group)

# Compare and identify keywords with significant differences
left_specific = []
right_specific = []
threshold = 2  # You can adjust this threshold

for keyword in keywords:
    left_count = keyword_trends["left"][keyword]
    right_count = keyword_trends["right"][keyword]
    if left_count > right_count * threshold:
        left_specific.append(keyword)
    elif right_count > left_count * threshold:
        right_specific.append(keyword)

# Print results
print("Keywords predominantly reported by the left group:")
print(left_specific)
print("\nKeywords predominantly reported by the right group:")
print(right_specific)


keyword_trends_file_path = os.path.join(public_dir_path, 'keyword_trends.json')
try:
    with open(keyword_trends_file_path, 'r') as json_file:
        existing_data = json.load(json_file)
except FileNotFoundError:
    existing_data = {}

# Update the existing data with the new data
existing_data.update({"left_keywords": left_specific, "right_keywords": right_specific})

# Write the updated data back to the file
with open(keyword_trends_file_path, 'w') as json_file:
    json.dump(existing_data, json_file, indent=4)

print("Updated keyword trends saved to 'keyword_trends.json'")