let express = require('express');
let router = express.Router();
let rf = require("fs");
let multer = require('multer')

let config = require("../config")

let fileWithExtension
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {

        let extension = file.originalname.match(/\.(\w+)$/)[1]
        let author = req.body.author
        let rename = getSha1(author + file.originalname) + "." + extension;

        fileWithExtension = rename
        cb(null, rename)
    }
})

let upload = multer({storage: storage})

router.get('/', async (req, res, next) => {
    let data = await read().then((data) => {
        log("先then一下")
        return data
    })
    res.send({
        status: 200,
        // watch:"in watch???",
        data
    })
    log("hos_api test ")
});

router.post('/', async (req, res, next) => {
    let data = await read()
    log(data)
    res.send({
        status: 200,
        data
    })
    log(3)
});

router.post('/upload', upload.any(), function (req, res, next) {
    // req.file 是文件的信息
    // req.body 将具有文本域数据，如果存在的话

    let imgFile = req.files[0]

    res.send({
        errno: 0,
        file: imgFile,
        author: req.body.author,
        data: [
            "//127.0.0.1:"+ config.dev.port+ "/static/images/" + fileWithExtension
        ],
        message:"已保存文件"
    })
})

async function read() {
    return new Promise((resolve, reject) => {
        rf.readFile(__dirname + "/test.txt", 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                // log(data)
                resolve(data)
            }
        });
    }).catch(err => {
        log(err)
    })
}


module.exports = router;
// export default  router;

