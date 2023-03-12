const Transaction = require('../models/transaction.model');
const sendEmail = require('../utils/artisanEmail');








// to receive event and Paystack data from convoy webhook
exports.artisanPaystack = async (req, res) => {
    try {
        const { event, data } = req.body; 
        console.log(data);     
        if(event === 'charge.success'){
            const provider = await Transaction.create({                
                amount: data.amount,
                currency: data.currency,
                tx_ref: data.reference,
                status: data.status,
                customer: data.customer.first_name,
                email: data.customer.email,
                phone_number: data.customer.phone,
                name: data.customer.last_name,

            });
            await sendEmail({
                email: provider.email,
                subject: `Payment Successful`,
                message: `Hello ${provider.name}, <br>
                        You have successfully made the payment of the one time non-refundable ${provider.amount} to be member. <br>
                        You are therefore, You are enjoin to display your works by uploading them to the space.
                        Your transaction reference is ${provider.tx_ref}. <br><br><br>
                        Thanks for patronage`
            });
        }
    } catch(error){
        return res.status(500).send({
            error: error.message,
            message: "internal server error"
        })

    }
};