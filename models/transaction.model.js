const mongoose = require('mongoose');





const transactionSchema = new mongoose.Schema({
    amount: {
        type: mongoose.Decimal128,
        default: 0.0, 
    },
    currency:{
        type:String,
    },
     
    tx_ref: {
        type:String,
    },
                
    status: {
        type:String,    
        enum:[
            'pending',
           'success',
            'failed'
        ]
    },
                
    customer: {
        type:String,
    },                
    email: {
        type: String,
        lowercase: true,
        trim: true,   
    },
                
    phone_number: {
        type: String,
        trim: true,
    },
                
    name: {
        type: String,
        trim: true,
    }
},
{
    timestamps: true,

},
);




module.exports = mongoose.model('Transaction', transactionSchema);

