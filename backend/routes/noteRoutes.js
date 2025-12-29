const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// CREATE note
router.post("/add", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 important for debug

    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const note = new Note({
      title,
      content,
    });

    await note.save();

    res.status(201).json({
      message: "Note saved successfully",
    });
  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
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
