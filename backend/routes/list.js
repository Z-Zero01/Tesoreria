const Router = require('express').Router
const app = Router()

const List = require('../models/list')

app.get('/list', (req, res) => {

    List.find()
        .sort('-date')
        .populate(
            'offerings.name',
        )
        .populate('member', 'nombre')
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

    let id= req.params.id

    List.findById(id)
        .populate('member', 'nombre')
        .populate({
            path: 'lists',
            populate: { path: 'offerings.name' }
        })
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

    let { member, offerings } = req.body

    let list = new List({
        member,
        offerings
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
        offerings: body.offering
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

app.delete('/list', (req, res) => {

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