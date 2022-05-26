var MongoClient = require('mongodb').MongoClient

var url = 'mongodb+srv://hoangsenpaidev:hoangvip123@cluster0.8sjuf.mongodb.net/Ex1?retryWrites=true&w=majority'

var mongo = new MongoClient(url, { useNewUrlParser: true })

mongo.connect((err, db) => {
    if (err) throw err

    console.log('connect success')

    var dbo = db.db('Ex1')


    function insertData() {
        var data = [

            {
                name: 'Nguyen Van A'
            }, {
                name: 'Nguyen Van B'
            }, {
                name: 'Nguyen Van C'
            }, {
                name: 'Nguyen Van D'
            }, {
                name: 'Nguyen Van E'
            }, {
                name: 'Nguyen Van F'
            }, {
                name: 'Nguyen Van G'
            }, {
                name: 'Nguyen Van H'
            }, {
                name: 'Nguyen Van K'
            }

        ]
        dbo.collection('person').insertMany(data, (err, rs) => {
            if (err) throw err
            console.log('Add to success: ' + rs)
            db.close()
        })
    }
    // insertData()

    function selectData() {
        dbo.collection('person').find().toArray((err, objs) => {
            if (err) throw err

            if (objs.length > 0) console.log('Lấy dữ liệu thành công !')
            console.log(objs)
            db.close()
        })
    }

    // selectData()

    function deleteData() {
        var data = {
            name: 'Nguyen Van C'
        }
        dbo.collection('person').deleteOne(data, (err, objs) => {
            if (err) throw err

            if (objs.length > 0) console.log('Xóa dữ liệu thành công !')
            console.log(objs)
            db.close()
        })
    }

    // deleteData()

    function updateData() {
        var oldValue = {
            name: 'Nguyen Van C'
        }

        var newValue = {
            $set: {
                name: 'Nguyen Van X',
                age: 22
            }
        }

        dbo.collection('person').updateOne(oldValue, newValue, (err, rs) => {
            if (err) throw err

            console.log('Cập nhật dữ liệu thành công !')
            console.log(rs)
            db.close()

        })
    }

    function updateData() {
        var sort = {
            name: -1
        }

        dbo.collection('person').find().sort(sort).toArray((err, rs) => {
            if (err) throw err
            if (rs.length > 0) console.log(rs)
            db.close()
        })
    }
    // updateData()

    function searchData() {
        var data = {
            name: 'Nguyen Van Cccc'
        }

        dbo.collection('person').find(data).toArray((err, rs) => {
            if (err) throw err
            if (rs.length > 0) {
                console.log('Dữ liệu bạn muốn: ')
                console.log(rs)
            } else {
                console.log('Không tìm thấy dữ liệu')
            }
            db.close()
        })
    }

    searchData()
})