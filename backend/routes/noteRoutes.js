const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// CREATE note
router.post("/add", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json({ message: "Note saved successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE note
router.delete("/delete/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE note
router.put("/update/:id", async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Note updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
