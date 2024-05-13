const ConnectionsModel = require("../models/connectionsList");
const {
  getEmailFromUniqueCode,
  getUserDetailsFromEmail,
} = require("./Getters");

async function handleAddConnection(req, res) {
  const fromUser = req.body.from;
  const toUser = req.body.to;

  console.log(fromUser, toUser)

  const user = await ConnectionsModel.findOne({userid: fromUser})
  const DataToPush = {
    userId: toUser,
  }

  if(user){
    
    const addfrnd = await user.connsList.push(DataToPush)
    if(addfrnd){
      if (user.connsList.some(conn => conn.userId === toUser)) {
        return res.status(400).json({ status: false, message: "Connection already exists." });
      }
      
      await user.save()
      return res.status(200).json({status:true,message:"Connection Request Sent Succesfully"})
    }
    return res.status(501).json({status:false,message:"Unable to send Connection Request"})    
  }
  const newConnection = new ConnectionsModel({
    userid: fromUser,
    connsList:[DataToPush]
  })
  const stat = await newConnection.save()
  if(stat){
    return res.status(200).json({status:true, message:"Your First Connection Request has been sent succesfully!!"})
  }
    
  return res.status(200).json({status:false,message:"Unable to send your First Connection Request :/"})
}

async function handleShowConnections(req, res) {
  const uid = req.body.uid;
  const allFriends = [];

  const suggs = await ConnectionsModel.findOne({ userid: uid });

  if (suggs) {
    const { connsList } = suggs;
    const falseStatusArray = [];

    // Map each item in connsList to a promise that resolves when the friend's details are fetched
    const friendPromises = connsList.map(async (item) => {
      if (item.status === true) {
        const friendEmail = await getEmailFromUniqueCode(item.userId);
        const { name } = await getUserDetailsFromEmail(friendEmail);
        return { id: item.userId, name: name };
      } else {
        falseStatusArray.push(item);
        return null;
      }
    });

    // Wait for all promises to resolve
    const resolvedFriends = await Promise.all(friendPromises);

    // Filter out null values and add the resolved friends to allFriends
    resolvedFriends.forEach((friend) => {
      if (friend) {
        allFriends.push(friend);
      }
    });
    return res.status(201).json(allFriends);
  } else {
    return res.status(404).json({ e: "error" });
  }
}

async function showPendingRequests(req, res){
  
}

module.exports = {
  handleAddConnection,
  handleShowConnections,
};
