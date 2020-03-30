const mongoose = require('mongoose')
let Schema = mongoose.Schema

let offeringSchema = new Schema({

  name: {
    type: String,
    unique: true,
    required: [true, 'Nombre es requerido']
  }

})

module.exports = mongoose.model('Offering', offeringSchema)