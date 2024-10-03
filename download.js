const ytdl = require("@distube/ytdl-core");
const cliProgress = require('cli-progress');
const fs = require('fs')

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const getStream = async (url) => {
    console.log(`Downloading from ${url}`)
    let allReceived = false

    return new Promise((resolve, reject) => {
        const stream = ytdl(url, {
            quality: ['136', '137', '18'],
            // quality: ['18'],
            filter: format => format.container === 'mp4'
        })
            .on('progress', (_, totalDownLoaded, total) => {
                if (!allReceived) {
                    progressBar.start(total, 0, {
                        mbTotal: (total / 1024 / 1024).toFixed(2),
                        mbValue: 0
                    })
                    allReceived = true
                }
                progressBar.increment()
                progressBar.update(
                    totalDownLoaded,
                    {
                        mbValue: (totalDownLoaded / 1024 / 1024).toFixed(2)
                    }
                )
            })
            .on('end', () => {
                progressBar.stop()
                console.log('下載完成了')
            })
        return resolve(stream)
    })

}

const downloadVideo = async (stream, url) => {
    const strs = url.split('=')
    const id = strs[1]
    const path = `downloadFiles/${id}.mp4`
    const writer = fs.createWriteStream(path)

    stream.pipe(writer)
    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            resolve({
                success: true
            })
        })
        writer.on('error', () => {
            resolve({
                success: false
            })
        })
    })
}

exports.getFile = async (url) => {
    const streams = await getStream(url)
    const movie = await downloadVideo(streams, url)

    if (!movie.success) {
        return ({
            success: false,
            err: '下載錯誤'
        })
    }
    return ({
        success: false
    })
}