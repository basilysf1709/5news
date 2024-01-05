import requests
from bs4 import BeautifulSoup

base_urls = {
    'indiatimes': 'https://www.indiatimes.com',
    'ndtv': 'https://www.ndtv.com'
}
url = ['https://www.indiatimes.com/news/india', 'https://www.ndtv.com/india#pfrom=home-ndtv_mainnavgation']

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
    # Find all the 'div' tags with class 'trndTxt' which contain the headlines
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


headlines_india_times = scrape_indiatimes_headlines(url[0])
headlines_ndtv = scrape_ndtv_headlines(url[1])

for headline_data in headlines_india_times:
    print(f"Headline: {headline_data['headline']}")
    print(f"URL: {headline_data['url']}")
    print()
    
for headline_data in headlines_ndtv:
    print(f"Headline: {headline_data['headline']}")
    print(f"URL: {headline_data['url']}")
    print()