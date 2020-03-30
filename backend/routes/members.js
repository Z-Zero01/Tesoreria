const { Router } = require('express')

const Member = require('../models/member')

const app = Router()

app.get('/members', async (req, res) => {

  const members = await Member.find()

  res.json({
    ok: true,
    members
  })

})

app.get('/members/:id', async (req, res) => {

  let id = req.params.id

  Member.findById(id)
        .sort('nombre')
        .exec( (err, memberDB) => {
      
          if (err) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }
          
          if (!memberDB) {
              return res.status(400).json({
                  ok: false,
                  err: {
                      message: 'Member not found'
                  }
              });
          }
    
          res.json({
              ok: true,
              memberDB
          });
      });

})

app.post('/members', async (req, res) => {

  const body = req.body

  let member = new Member({
    nombre: body.nombre
  })
  
  member.save( (err, memberDB) => {

    if (err) {
        return res.status(400).json({
            ok: false,
            err: "Member name is already saved."
        });
    }

    res.json({
        ok: true,
        member: memberDB
    });
  });

  

})

app.put('/members', async (req, res) => {

  let name = req.body.name,
      id = req.body.id

  let newName = { nombre: name}

  Member.findByIdAndUpdate(id, newName, {new: true}, (err, memberUpdated) => {

    if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }

    if (!memberUpdated) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Member not found'
            }
        });
    }

    res.json({
        ok: true,
        memberUpdated
    });

  })

})

app.delete('/members', async (req, res) => {

  let id = req.body.id

  Member.findByIdAndDelete(id, (err, memberDeleted) => {

    if (err) {
      return res.status(500).json({
          ok: false,
          err
      });
  }

  if (!memberDeleted) {
      return res.status(400).json({
          ok: false,
          err: {
              message: 'Member not found'
          }
      });
  }

  res.json({
    ok: true,
    memberDeleted
});
    
  })

})

module.exports = app;