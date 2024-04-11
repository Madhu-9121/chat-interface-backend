const Chat = require('../model/Chat')
const addChat = async(userId,title,messages)=>{
    try{
        const newChat = new Chat({
            userId: userId,
            conversations:[{
                title:title,
                messages:messages}
            ]
        });

        const savedChat = await newChat.save();
        return savedChat

    }catch(e){
        throw new Error(e)


    }
}
const getChat = async(user)=>{
    try{
        const chats = await Chat.find({userId:user}).sort('-timestamp');
        return chats

    }catch(e){
        throw new Error(e)
        
    }
}
module.exports ={addChat,getChat}