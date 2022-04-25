const express = require('express');
const dotenv = require('dotenv');
const Order= require('../models/orders');
const { v4: uuidv4 } = require('uuid');
const Razorpay = require('razorpay');
const router = express.Router();

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

router.get('/order/:amount', (req, res) => {
    console.log('rajesh')
    try {
        const options = {
            amount: Number(req.params.amount) * 100,
            currency: 'INR',
            receipt: uuidv4(),
            payment_capture: 0,
        };
        instance.orders.create(options, async (err, order) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Something went wrong' });
            }
            return res.status(200).json(order);
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
});

router.post('/capture/:paymentId/:amount', (req, res) => {
    console.log('rajeevsoori')
    try {
        return request(
            {
                method: 'POST',
                url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
                form: {
                    amount: Number(req.params.amount) * 100,
                    currency: 'INR',
                },
            },
            async function (err, res, body) {
                if (err) {
                    return res.status(500).json({
                        message: 'Something Went Wrong',
                    });
                }
                return res.json(body);
            },
        );
    } catch (err) {
        return res.status(500).json({
            message: 'Something Went Wrong',
        });
    }
});

router.patch('/createorder',async(req,res)=>{ 
    console.log(req.body)
    try{
    const o=new Order(req.body)
        await o.save()
    } catch(err){
        console.log(err)
        return res.status(400).send(err)
    }

    res.status(200).send("OK")

})

module.exports = router;
