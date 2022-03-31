const { Socket } = require("socket.io");
const db = require("../db");
const router = require("express").Router();

router.post("/chat", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.reciverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
