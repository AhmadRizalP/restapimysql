const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const { error } = require("console")
const moment = require("moment")
const { EROFS } = require("constants")
const { join } = require("path")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Connection MYSQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pelanggaran_siswa"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})


app.get("/siswa", (req, res) => {
    let sql = "select * from siswa"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

app.post("/siswa", (req, res) => {
    let data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        point: req.body.point
    }
    let sql = "insert into siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})

app.get("/siswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    let sql = "select * from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

app.put("/siswa", (req, res) => {
    let data = [{
            nis: req.body.nis,
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
            point: req.body.point
        },
        {
            id_siswa: req.body.id_siswa
        }
    ]

    let sql = "update siswa set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/siswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    let sql = "delete from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.post("/pelanggaran_siswa", (req, res) => {
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    let pelanggaran = JSON.parse(req.body.pelanggaran)
    let sql = "insert into pelanggaran_siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null

        if (error) {
            res.json({ message: error.message })
        } else {
            let lastID = result
            res.json(lastID)
            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])
            }

            let sql = "insert into detail_pelanggaran_siswa value ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: "Data has been inserted" })
                }
            })

        }
    })
})

app.get("/pelanggaran_siswa", (req, res) => {
    let sql =
        "select p.id_pelanggaran_siswa, p.id_siswa,p.waktu,s.nis,s.nama_siswa,p.id_user, u.nama_user" +
        " from pelanggaran_siswa p join siswa s on p.id_siswa = s.id_siswa" +
        " join user u on p.id_user = u.id_user"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                pelanggaran_siswa: result
            })
        }
    })
})

app.get("/pelanggaran_siswa/:id_pelanggaran_siswa", (req, res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa }

    let sql = "select p.nama_pelanggaran, p.point " +
        "from detail_pelanggaran_siswa dps join pelanggaran p " +
        "on p.id_pelanggaran = dps.id_pelanggaran where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                detail_pelanggaran_siswa: result
            })
        }
    })
})

app.delete("/pelanggaran_siswa/:id_pelanggaran_siswa", (req, res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa }

    let sql = "delete from detail_pelanggaran_siswa where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa }

            let sql = "delete from pelanggaran_siswa where ?"

            db.query(sql, param, (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: "Data has been deleted" })
                }
            })
        }
    })
})

app.listen(8080, () => {
    console.log("Run on port 8080")
})