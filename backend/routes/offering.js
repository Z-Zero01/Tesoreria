const { v4 } = require('uuid')
const Router = require('express').Router

const Offering = require('../models/offering')

const app = Router()

app.get('/offering', async (req, res) => {

  const offerings = await Offering.find()

  res.json({
    ok: true,
    offerings
  })

})

app.post('/offering', async (req, res) => {

  let { name } = req.body

  let offering = new Offering({
    name
  })

  offering.save( function offeringSaved(err, offeringDB) {

    if (err) {
      return res.status(400).json({
        ok: false,
        err: "Offering is already saved."
      })
    }

    res.json({
      ok: true,
      offering: offeringDB
    })

  })

})

app.put('/offering', async (req, res) => {

  let name = req.body.name,
      id = req.body.id

  let newName = { name: name}

  Offering.findByIdAndUpdate(id, newName, {new: true}, (err, offeringUpdated) => {

    if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }

    if (!offeringUpdated) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Offering not found'
            }
        });
    }

    res.json({
        ok: true,
        offeringUpdated
    });

  })

})

app.delete('/offering', async (req, res) => {

  let id = req.body.id

  Offering.findByIdAndDelete(id, (err, offeringDeleted) => {

    if (err) {
      return res.status(500).json({
          ok: false,
          err
      });
  }

  if (!offeringDeleted) {
      return res.status(400).json({
          ok: false,
          err: {
              message: 'Offering not found'
          }
      });
  }

  res.json({
    ok: true,
    offeringDeleted
  });
    
  })

})


module.exports = app