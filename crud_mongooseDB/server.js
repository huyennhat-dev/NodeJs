const express = require('express')
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const productModule = require('./product')
const app = express();

const multer = require('multer')

const port = 4000;

const ImageModel = require('./image.model')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const url = 'mongodb+srv://hoangsenpaidev:hoangvip123@cluster0.8sjuf.mongodb.net/Ex1?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to sucessfully')
    })
    .catch((err) => {
        throw err
    })

//storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, req.body.name + '.jpg')
    }
})

const upload = multer({
    storage: Storage
}).single('image')

app.get('/', (req, res) => {
    let insertData = () => {
        for (let index = 0; index < 10; index++) {
            const product = productModule({ productName: 'tao ' + String(index), quantity: index });
            product.save()
                .then(() => { console.log("Thêm dữ liệu thành công ... ") })
                .catch((err) => { throw err });
        }
    }
    let delAllData = () => {
        productModule.deleteMany({}, (err) => {
            if (err) throw err;

            console.log("Xóa toàn bộ bảng thành công !!!");
        });
    }

    let delOneData = () => {
        productModule.deleteOne({ productName: 'tao 3' }, (err) => {
            if (err) throw err;

            console.log("Xóa sp thành công !!!");
        });
    }

    // update
    let updateData = () => {
        productModule.updateMany({ productName: 'tao 1' }, { productName: 'tao 111111111111111', quantity: 111111 }, (err, res) => {
            if (err) throw err;

            console.log("Cập nhật thành công <---- ");
            console.log(res);
        });
    }

    productModule.find({}, (err, docs) => {
        delAllData()
        res.send(docs)
    })
})

app.post('/upload', (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.log(err)
            } else {
                const newImage = new ImageModel({
                    name: req.body.name,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                })
                newImage.save()
                    .then(() => res.send('sucessfully uploaded'))
                    .catch((err) => console.log(err))
            }
        })
    })
    //Load images 
app.get('/getfile/:path', (req, res) => {
    res.download('./uploads/' + req.params.path)
})

app.listen(port, () => {
    console.log("Server Đang chạy http://localhost:" + port);
});