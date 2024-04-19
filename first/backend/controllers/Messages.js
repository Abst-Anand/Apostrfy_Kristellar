// messageController.js

const sendMessage = (io, customIdToSocketIdMap, data) => {
    const { recipientCustomId, message } = data;
    console.log(`Sending message "${message}" to client with custom ID "${recipientCustomId}"`);
  
    // Get socket ID from custom ID
    const recipientSocketId = customIdToSocketIdMap.get(recipientCustomId);
    if (recipientSocketId) {
      // Send message to the client with the mapped socket ID
      io.to(recipientSocketId).emit('message', message);
    } else {
      console.log(`Custom ID "${recipientCustomId}" not found`);
    }
  };
  
  module.exports = {
    sendMessage,
  };
  