const mongoose = require('mongoose')
let Schema = mongoose.Schema

let listSchema = new Schema({

    member:{
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },

    offerings: [
        {
            name: {
                type: Schema.Types.ObjectId,
                ref: 'Offering',
            },
            quantity: {
                    type: Number,
                    default: 0
            }
            
        },
    ],

    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('List', listSchema)
