const Router = require('express').Router
const app = Router()

const List = require('../models/list')

app.get('/list', (req, res) => {

    List.find()
        .sort('-date')
        .populate('member', 'nombre')
        .populate('offering', 'name')
        .exec( (err, lists) => {
            
            if (err) {
                res.json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                lists
            })

    })

})

app.get('/list/:id', (req, res) => {

    let { id } = req.params

    List.findById(id)
        .populate('member', 'nombre')
        .populate('offering', 'name')
        .then( list => {
            res.json({
                ok: true,
                list
            })
        })
        .catch( err => {
            if (err) throw err
        })

})

app.post('/list', (req, res) => {

    let { member, offering, quantity } = req.body

    let list = new List({
        member,
        offering,
        quantity
    })

    list.save( function listSaved(err, listSaved) {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            list: listSaved
        })

    }) 

})

app.put('/list/:id', (req, res) => {

    let { id } = req.params
    let body= req.body

    const newList = {
        member: body.member,
        offering: body.offering,
        quantity: body.quantity
    }

    List.findByIdAndUpdate(id, newList, {new: true})
            .then( listUpdated => {
            res.json({
                ok: true,
                listUpdated
            })
            })
            .catch( err => {
            if (err) throw err
            })

})

app.delete('/list/:id', (req, res) => {

    let { id } = req.body

    List.findByIdAndRemove(id)
            .then( listDeleted => {
            
                if(!listDeleted) {
                    return res.json({
                    ok: false,
                    err:{
                        message: 'List not found'
                    }
                    })
                }

                res.json({
                    ok: true,
                    message: 'List deleted',
                    listDeleted
                })
            })
            .catch( err => {
                if (err) throw err 
            })

})

module.exports = app