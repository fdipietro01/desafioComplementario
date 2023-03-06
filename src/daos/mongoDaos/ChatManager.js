const chatModel = require('../../models/chatModel')

class ChatManager{
    async getMessages (){
        try{
            const chat = await chatModel.find({}).lean()
            return chat
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    
    async addMessage (message){
        try{
            await chatModel.create(message)
            const chat = await this.getMessages()
            return chat
        }
        catch(err){
            throw new Error(err.message)
        }
    }
}

module.exports = ChatManager