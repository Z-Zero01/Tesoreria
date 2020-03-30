const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let memberSchema = new Schema({

  nombre: {
    unique: true,
    type: String,
    required: [true, 'El nombre es necesario']
  }

})

memberSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Member', memberSchema)