const puppeteer = require('puppeteer')
const cheerio = require('cheerio');


exports.crawler = async (url, urlType) => {
    let browser
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        const page = await browser.newPage()
        await page.goto(url);

        const targetHtml = await page.content()

        if(urlType !== 3){
            const urlList = parse(targetHtml, urlType)
            return urlList
        } else {
            return [url]
        }
    } catch (error) {
        console.log(`發生錯誤，錯誤內容: ${error}`)
        return []
    } finally {
        if (browser) {
            await browser.close()
        }
    }

}

const parse = (html, type) => {
    const $ = cheerio.load(html);
    let result = []
    switch (type) {
        case 1:
            // 創作者影片頁面
            $('#content ytd-rich-item-renderer').each((i, element) => {
                const ytVideoUrl = $(element).find('a#thumbnail').attr('href')
                if (ytVideoUrl) {
                    result.push(`https://www.youtube.com${ytVideoUrl}`)
                } else {
                    console.log(`Element ${i} 沒有找到啦`);
                }
            })
            break;
        case 2:
            $('#content ytd-playlist-video-renderer').each((i, element) => {
                const ytVideoUrl = $(element).find('a#thumbnail').attr('href')
                if (ytVideoUrl) {
                    result.push(`https://www.youtube.com${ytVideoUrl}`)
                } else {
                    console.log(`Element ${i} 沒有找到啦`);
                }
            })
            break;
        default:
            break;
    }

    return result
}