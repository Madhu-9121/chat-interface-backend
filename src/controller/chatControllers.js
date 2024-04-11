const chatServices = require('../services/chatServices')


const addChat = async (req, res) => {
    try {
        const userId = req.user
        const  {title,messages} = req.body;
        const newChat = chatServices.addChat(userId,title,messages)
        res.status(201).json(newChat); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getChat = async(req,res)=>{
    try {
        const user = req.user
        
        const chats = await chatServices.getChat(user)
        res.status(200).json(chats)
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }

}


module.exports = {addChat,getChat}