const Transaction = require('../models/Transaction')

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}


exports.addTransactions = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await Transaction.create(req.body);
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            console.log(messages)
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            })
        }

    }
}


exports.deleteTransactions = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return res.status(400).json({
                success: false,
                error: 'No transaction found'
            })
        }

        // await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}