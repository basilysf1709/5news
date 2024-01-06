import requests
from bs4 import BeautifulSoup

base_urls = {
    'indiatimes': 'https://www.indiatimes.com',
    'ndtv': 'https://www.ndtv.com'
}
url = [
        'https://www.indiatimes.com/news/india', 
        'https://www.ndtv.com/india#pfrom=home-ndtv_mainnavgation',
        'http://www.news18.com'
    ]
# [
#     {"Indiatimes": "http://www.indiatimes.com"},
#     {"NDTV News": "http://www.ndtv.com"},
#     {"News18": "http://www.news18.com"},
#     {"The Indian Express": "http://www.indianexpress.com"},
#     {"Hindustan Times": "http://www.hindustantimes.com"},
#     {"India Today": "http://www.indiatoday.in"},
#     {"Livemint": "http://www.livemint.com"},
#     {"Zee News": "http://zeenews.india.com"},
#     {"Oneindia": "http://www.oneindia.com"},
#     {"Republic TV": "http://www.republicworld.com"},
#     {"The Hindu": "http://www.thehindu.com"},
#     {"The Financial Express": "http://www.financialexpress.com"},
#     {"Times Now": "http://www.timesnownews.com"},
#     {"Business Standard": "http://www.business-standard.com"},
#     {"FirstPost": "http://www.firstpost.com"},
#     {"The Print": "http://www.theprint.in"},
#     {"DNA India": "http://www.dnaindia.com"},
#     {"The Quint": "http://www.thequint.com"},
#     {"Scroll.in": "http://www.scroll.in"},
#     {"The Hindu Business Line": "http://www.thehindubusinessline.com"}
# ]

def scrape_indiatimes_headlines(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    headlines = soup.find_all('a', class_='card-title')
    headlines_data = [{'headline': headline.get_text(strip=True), 'url': base_urls['indiatimes'] + headline['href']} for headline in headlines if headline.get_text(strip=True)]
    
    return headlines_data

def scrape_ndtv_headlines(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    trndTxt_divs = soup.find_all('div', class_='trndTxt')
    headlines_data = []
    for div in trndTxt_divs:
        a_tag = div.find('a')
        if a_tag and a_tag.text:
            headlines_data.append({
                'headline': a_tag.text.strip(),
                'url': a_tag['href'].strip()
            })
    return headlines_data

def scrape_news18_headlines(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    
    left_headlines = []
    
    # Scrape the main story from the left side
    top_story_headline = soup.find('h1', class_='homeTopStory')
    if top_story_headline:
        headline_text = top_story_headline.text.strip()  # Extract the text
        headline_url = top_story_headline.find_parent('a')['href']  # Get the URL from the parent 'a' tag
        left_headlines.append({
                'headline': headline_text,
                'url': headline_url
            })

    # Scrape sub stories from the left side (limit to 2 since we already have the main story)
    sub_headlines_left = soup.find_all('h2', class_='sub_headstory_title', limit=3)
    for headline in sub_headlines_left:
        a_tag = headline.find('a')
        if a_tag:
            left_headlines.append({
                'headline': a_tag.text.strip(),
                'url': a_tag['href']
            })

    # Scrape stories from the right side
    top_story_right = soup.find_all('div', class_='top_story_right', limit=5)
    right_headlines = [{
        'headline': div.h2.text,
        'url': div.a['href']
    } for div in top_story_right]

    return left_headlines + right_headlines


headlines_india_times = scrape_indiatimes_headlines(url[0])
headlines_ndtv = scrape_ndtv_headlines(url[1])
news18_headlines = scrape_news18_headlines(url[2])


for headline_data in headlines_india_times:
    print(f"Headline: {headline_data['headline']}")
    print(f"URL: {headline_data['url']}")
    print()
    
for headline_data in headlines_ndtv:
    print(f"Headline: {headline_data['headline']}")
    print(f"URL: {headline_data['url']}")
    print()

for headline in news18_headlines:
    print(f"Headline: {headline['headline']}")
    print(f"URL: {headline['url']}\n")