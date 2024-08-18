var express = require("express");
var router = express.Router();
var axios = require("axios");
var dotenv = require("dotenv");

router.get("/", async (req, res, next) => {

    dotenv.config();

    // 이미지 데이터를 바이너리 형태로 다운로드
    const url =
        "https://clova-ocr-test.s3.ap-northeast-2.amazonaws.com/receipt1.jpg";
    const img = await axios.get(url, {
        responseType: "arraybuffer",
    });

    // Buffer를 사용해 Base64로 인코딩
    const base64Image = Buffer.from(img.data, "binary").toString("base64");

    const ocrUrl = "https://1l8mnx9ap5.apigw.ntruss.com/custom/v1/33600/7421306ff3c576bde6b6088961ce77f253b4467347f9348761bde666036c3538/document/receipt"
    const headers = {
        "X-OCR-SECRET": process.env.SECRET_KEY,
    };

    const body = {
        images: [
            {
                format: "jpg",
                name: "receipt1",
                data: base64Image,
            },
        ],
        lang: "ko",
        requestId: "string",
        timestamp: 0,
        version: "V2",
    };

    const ocrData = await axios.post(ocrUrl, body, { headers });
    console.log(ocrData.data.images[0].receipt.result);
    res.send(ocrData.data.images[0].receipt.result);
});

module.exports = router;
