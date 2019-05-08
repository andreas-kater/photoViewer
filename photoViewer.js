var fs = require('fs')
var path = require('path')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

// var moveFrom = "/Users/andreaskater/GoogleDrive/Candi/Candi's\ Wedding/Wedding\ photos/Candi\ Wedding\ Photos/PHOTOGRAPHER/ceremony"
// var moveFrom = "/Users/andreaskater/GoogleDrive/Candi/Candi's Wedding/Wedding photos/Candi Wedding Photos/PHOTOGRAPHER/cocktail"
var moveFrom = "/Users/andreaskater/GoogleDrive/Candi/Candi's Wedding/Wedding photos/Candi Wedding Photos/PHOTOGRAPHER/couplesession"
// var moveFrom = "/Users/andreaskater/GoogleDrive/Candi/Candi's Wedding/Wedding photos/Candi Wedding Photos/PHOTOGRAPHER/fireworkparty"
var moveTo = "/Users/andreaskater/Dev/photo-viewer/viewer/public"
var saveTo = "/Users/andreaskater/Dev/photo-viewer/output"

const getLine = function () {
    return new Promise((resolve, reject) => {
        readline.question(`save?`, (answer) => {
            resolve(answer)
        })
    })
}

async function cycleThroughPhotos() {
    const files = await fs.readdirSync(moveFrom)
    for (var i = 0; i < files.length; i++) {
        let file = files[i]
        let fromPath = path.join(moveFrom, file)
        let toPath = path.join(moveTo, 'image.jpg')
        let stat = await fs.statSync(fromPath)
        if (stat.isFile()) {
            await fs.copyFileSync(fromPath, toPath)
            let answer = await getLine()
            if (answer === 's') {
                let savePath = path.join(saveTo, file)
                await fs.copyFileSync(fromPath, savePath)
            } else if (answer === 'b') {
                i = i - 2
            }
        }
    }
    process.exit(0)
}
cycleThroughPhotos()