const express = require('express')
const router = express.Router()
const chatController = require('../controller/chatControllers')
const Authunticate = require('../middleware/authenticateToken')

router.get('/',Authunticate,chatController.getChat)
router.post('/',Authunticate, chatController.addChat)
module.exports = router
