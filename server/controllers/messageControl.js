const Message = require("../models/Message")


async function addMessage(req, res, next) {
    try {
        const {message, sender, recipient} = req.body
    } catch (err) {
        next(err)
    }
}