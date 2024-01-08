import requests
import json
from bs4 import BeautifulSoup

base_urls = {
    'indiatimes': 'https://www.indiatimes.com',
    'ndtv': 'https://www.ndtv.com'
}
url = [
        'https://www.indiatimes.com/news/india', 
        'https://www.ndtv.com/india#pfrom=home-ndtv_mainnavgation',
        'http://www.news18.com',
        'https://indianexpress.com/',
        'https://www.indiatoday.in/',
        'https://www.financialexpress.com/india-news/',
        'https://www.timesnownews.com/india',
        'https://www.business-standard.com/',
        'https://theprint.in/',
    ]

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
    top_story_headline = soup.find('h1', class_='homeTopStory')
    if top_story_headline:
        headline_text = top_story_headline.text.strip()
        headline_url = top_story_headline.find_parent('a')['href']
        left_headlines.append({
                'headline': headline_text,
                'url': headline_url
            })
    sub_headlines_left = soup.find_all('h2', class_='sub_headstory_title', limit=3)
    for headline in sub_headlines_left:
        a_tag = headline.find('a')
        if a_tag:
            left_headlines.append({
                'headline': a_tag.text.strip(),
                'url': a_tag['href']
            })
    top_story_right = soup.find_all('div', class_='top_story_right', limit=5)
    right_headlines = [{
        'headline': div.h2.text,
        'url': div.a['href']
    } for div in top_story_right]
    return left_headlines + right_headlines

def scrape_indian_express_headlines(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    article_classes = ['other-article']
    headline_data = []
    for article_class in article_classes:
        article_divs = soup.find_all('div', class_=article_class)
        for div in article_divs:
            h3_tag = div.find('h3')
            if h3_tag and h3_tag.find('a'):
                headline_data.append({
                    'headline': h3_tag.a.text.strip(),
                    'url': h3_tag.a['href']
                })
    return headline_data

def scrape_hindustan_times_headlines(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    headline_tags = soup.find_all(['h2', 'h3'], class_='hdg3')
    headlines = []
    for tag in headline_tags:
        a_tag = tag.find('a')
        if a_tag and 'href' in a_tag.attrs:
            headlines.append({
                'headline': a_tag.get_text(strip=True),
                'url': a_tag['href']
            })
    return headlines

def scrape_india_today_headlines(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    headlines_data = []
    h3_tags = soup.find_all('h3')
    for h3 in h3_tags:
        a_tag = h3.find('a', attrs={'linktype': 'it'})
        if a_tag:
            headlines_data.append({
                'headline': a_tag.text.strip(),
                'url': a_tag['href']
            })
    return headlines_data

def scrape_financialexpress_headlines(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    headlines_data = []
    for h2 in soup.find_all('h2', class_='entry-title'):
        a_tag = h2.find('a')
        if a_tag:
            headlines_data.append({
                'headline': a_tag.text.strip(),
                'url': a_tag['href']
            })
    return headlines_data

def scrape_timesnownews_headlines(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    headlines_data = []
    for a_tag in soup.find_all('a', class_='undefined')[:5]:  
        title = a_tag.get('title', '').strip()
        if title:
            headlines_data.append({
                'headline': title,
                'url': a_tag['href']
            })
    return headlines_data

def scrape_business_standard_headlines(url):
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    if response.status_code != 200:
        return f"Failed to retrieve page, status code: {response.status_code}"

    soup = BeautifulSoup(response.text, 'html.parser')
    headlines_data = []
    cardlist_divs = soup.find_all('div', class_='cardlist')
    for div in cardlist_divs[:5]:
        a_tag = div.find('a')
        if a_tag and a_tag.text:
            headlines_data.append({
                'headline': a_tag.text.strip(),
                'url': a_tag['href'] if a_tag['href'].startswith('http') else 'https://www.business-standard.com' + a_tag['href']
            })
    return headlines_data

def scrape_theprint_headlines(url):
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    if response.status_code != 200:
        return f"Failed to retrieve page, status code: {response.status_code}"

    soup = BeautifulSoup(response.text, 'html.parser')
    headlines_data = []
    for h3_tag in soup.find_all('h3', class_='entry-title td-module-title')[:6]:  # limit to top 5
        a_tag = h3_tag.find('a', rel='bookmark')
        if a_tag and a_tag.text:
            headlines_data.append({
                'headline': a_tag.text.strip(),
                'url': a_tag['href']
            })

    return headlines_data

all_headlines = {
    'Indiatimes': {
        "political-spectrum": "centre-right",
        "headlines": scrape_indiatimes_headlines(url[0]),
    },
    'NDTV': {
        "political-spectrum": "left",
        "headlines": scrape_ndtv_headlines(url[1])
    },
    'News18': {
        "political-spectrum": "right",
        "headlines": scrape_news18_headlines(url[2])
    },
    'IndianExpress': {
        "political-spectrum": "centre-left",
        "headlines": scrape_indian_express_headlines(url[3])
    },
    'IndiaToday': {
        "political-spectrum": "centre-right",
        "headlines": scrape_india_today_headlines(url[4])
    },
    'FinancialExpress': {
        "political-spectrum": "centre-right",
        "headlines": scrape_financialexpress_headlines(url[5])
    },
    'TimesNow': {
        "political-spectrum": "right",
        "headlines": scrape_timesnownews_headlines(url[6])
    },
    'Business-Standard': {
        "political-spectrum": "centre",
        "headlines": scrape_business_standard_headlines(url[7])
    },
    'ThePrint': {
        "political-spectrum": "centre",
        "headlines": scrape_theprint_headlines(url[8])
    }
}
with open('headlines.json', 'w') as file:
    json.dump(all_headlines, file, ensure_ascii=False, indent=4)