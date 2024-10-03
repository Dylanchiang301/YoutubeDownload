const { crawler } = require('./crawler');
const { getFile } = require('./download')

// 獲取命令行參數，通常 process.argv[2] 是傳入的 URL
const url = process.argv[2];

if (!url) {
    console.error('沒有給網址是要下載個什麼東東？');
    process.exit(1);  // 沒有 URL，退出程序
}

(async () => {
    let urlType = 1
    const regexVideoPage = /^https:\/\/www\.youtube\.com\/@[^\/]+\/videos$/;  // 2. 匹配以 @ 開頭並以 /videos 結尾的 YouTube URL
    const regexPlayListPage = /^https:\/\/www\.youtube\.com\/playlist\?list=[\w-]+$/;  // 3. 匹配 playlist URL
    const regexWatchPage = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/;  // 3. 匹配 影片頁面 URL

    switch (true) {
        case regexVideoPage.test(url):
            // 如果是 /videos 頁面，設置 urlType 為 1，因為符合video也會符合創作者個人首頁，因此要先處理
            urlType = 1;
            break;
        case regexPlayListPage.test(url):
            // 如果是播放列表頁面，設置 urlType 為 2
            urlType = 2;
            break;
        case regexWatchPage.test(url):
            // 如果是影片的頁面，設置 urlType 為 3
            urlType = 3;
            break;
        default:
            console.error('網址只能是影片頁面、創作者影片清單頁面、播放清單！！！');
            urlType = 0;  // 不符合任何模式時設置為 0 或其他值
            return
    }

    const videos = await crawler(url, urlType)

    if (videos.length === 0) {
        console.log('這個網址找不到影片啊~~~~', videos)
    } else {
        console.log(videos.length, '下載的影片列表，請查閱', videos)
    }

    // 下載動作
    for (let url of videos) {
        await getFile(url)
    }
})()