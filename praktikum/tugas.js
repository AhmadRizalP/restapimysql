const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const { error } = require("console")
const moment = require("moment")
const { EROFS } = require("constants")
const { response } = require("express")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rent_car"
})
db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

//Mobil CRUD Basic
app.get("/mobil", (req, res) => {
    let sql = "select * from mobil"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                mobil: result
            })
        }
    })
})
app.get("/mobil/:id", (req, res) => {
    let data = {
        id_mobil: req.params.id
    }
    let sql = "select * from mobil where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                mobil: result
            })
        }
    })
})
app.post("/mobil", (req, res) => {
    let data = {
        id_mobil: req.body.id_mobil,
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa: req.body.biaya_sewa,
        image: req.body.image
    }
    let sql = "insert into mobil set ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                message: result.affectedRows + " data inserted"
            })
        }
    })
})
app.put("/mobil", (req, res) => {
    let data = [{
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa: req.body.biaya_sewa,
        image: req.body.image
    }, {
        id_mobil: req.body.id_mobil
    }]
    let sql = "update mobil set ? where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                message: result.affectedRows + " data updated"
            })
        }
    })
})
app.delete("/mobil/:id_mobil", (req, res) => {
    let data = {
        id_mobil: req.params.id_mobil
    }
    let sql = "delete from sewa where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            let sql = "delete from mobil where ?"

            db.query(sql, data, (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: result.affectedRows + " data deleted" })
                }
            })
        }
    })
})

//Pelanggan CRUD Basic
app.get("/pelanggan", (req, res) => {
    let sql = "select * from pelanggan"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                pelanggan: result
            })
        }
    })
})
app.get("/pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    let sql = "select * from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                pelanggan: result
            })
        }
    })
})
app.post("/pelanggan", (req, res) => {
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }
    let sql = "insert into pelanggan set ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                message: result.affectedRows + " data inserted"
            })
        }
    })
})
app.put("/pelanggan", (req, res) => {
    let data = [{
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }, {
        id_pelanggan: req.body.id_pelanggan
    }]
    let sql = "update pelanggan set ? where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                message: result.affectedRows + " data Updated"
            })
        }
    })
})
app.delete("/pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    let sql = "delete from pelanggan where ?"
    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({ message: result.affectedRows + " data deleted" })
        }
    })
})

//Karyawan CRUD Basic
app.get("/karyawan", (req, res) => {
    let sql = "select * from karyawan"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                karyawan: result
            })
        }
    })
})
app.get("/karyawan/:id", (req, res) => {
    let data = {
        id_karyawan: req.params.id
    }
    let sql = "select * from karyawan where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                pelanggan: result
            })
        }
    })
})
app.post("/karyawan", (req, res) => {
    let data = {
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: req.body.password
    }
    let sql = "insert into karyawan set ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                message: result.affectedRows + " data inserted"
            })
        }
    })
})
app.put("/karyawan", (req, res) => {
    let data = [{
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: req.body.password
    }, {
        id_karyawan: req.body.id_karyawan
    }]
    let sql = "update karyawan set ? where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                message: result.affectedRows + " data Updated"
            })
        }
    })
})
app.delete("/karyawan/:id", (req, res) => {
    let data = {
        id_karyawan: req.params.id
    }
    let sql = "delete from sewa where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            let sql = "delete from karyawan where ?"

            db.query(sql, data, (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: result.affectedRows + " data Deleted" })
                }
            })
        }
    })
})

//Sewa CRUD Basic
app.get("/sewa", (req, res) => {
    let sql = "select * from sewa"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                sewa: result
            })
        }
    })
})
app.get("/sewa/:id", (req, res) => {
    let data = {
        id_sewa: req.body.id
    }
    let sql = "select * from sewa where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                sewa: result
            })
        }
    })
})
app.post("/sewa", (req, res) => {
    let sewa = moment().format('YYYY-MM-DD')
    let kembali = moment().add(5, 'days').format('YYYY-MM-DD')
    let idmob = {
        id_mobil: req.body.id_mobil
    }

    let sql = "select biaya_sewa from mobil where ?"
    db.query(sql, idmob, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            let biaya = result[0].biaya_sewa
            let total = biaya * 5
            let data = {
                id_sewa: req.body.id_sewa,
                id_mobil: idmob.id_mobil,
                id_karyawan: req.body.id_karyawan,
                id_pelanggan: req.body.id_pelanggan,
                tgl_sewa: sewa,
                tgl_kembali: kembali,
                total_bayar: total
            }
            let sql = "insert into sewa set ?"

            db.query(sql, data, (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: "Data has been Inserted" })
                }
            })

        }
    })
})
app.put("/sewa", (req, res) => {
    let tambah = req.body.tambah_hari
    let idmob = {
        id_mobil: req.body.id_mobil
    }

    let data = [{
        id_mobil: idmob.id_mobil,
    }, {
        id_sewa: req.body.id_sewa
    }]

    let sql = "update sewa set ? where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {

            let sql = "select total_bayar, tgl_kembali from sewa where ?"

            db.query(sql, idmob, (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    let total1 = result[0].total_bayar
                    let tglkem = result[0].tgl_kembali

                    let sql = "select biaya_sewa from mobil where ?"
                    db.query(sql, idmob, (error, result) => {
                        if (error) {
                            res.json({ message: error.message })
                        } else {
                            let biaya = result[0].biaya_sewa
                            let total2 = biaya * tambah
                            let total_akhir = total1 + total2
                            let tgl_kem = moment(tglkem).add(tambah, 'days').format('YYYY-MM-DD')

                            let data1 = [{
                                tgl_kembali: tgl_kem,
                                total_bayar: total_akhir
                            }, {
                                id_mobil: idmob.id_mobil
                            }]
                            let sql = "update sewa set ? where ?"
                            db.query(sql, data1, (error, result) => {
                                if (error) {
                                    res.json({ message: error.message })
                                } else {
                                    res.json({ message: "Data has been Updated" })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
app.delete("/sewa/:id", (req, res) => {
    let data = {
        id_sewa: req.params.id
    }
    let sql = "delete from sewa where ?"

    db.query(sql, data, (error, result) => {
        if (error) {
            res.json({ message: error })
        } else {
            res.json({ message: "Data has been Deleted" })
        }
    })
})

app.listen(8080, () => {
    console.log("Run on port 8080")
})