import { response } from "express";
import Note from "../Models/Note.js";

export async function getAllnotes(req, res) {
  try {
    const notes = await Note.find().sort({isCompleted : 1}); //gives the newest Note first
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req,res){
  try {
    const note = await Note.findById(req.params.id);

    if(!note) return res.status(404).json({message:"Note not found"});
    res.status(200).json(note)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createnotes(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    const note = new Note({ title, description, dueDate });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updatenotes(req, res){
  try {
    const {title,description, dueDate} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,
      {title,description, dueDate},
      {
        new:true
      });

    if(!updatedNote) return res.status(404).json({message:"Note not found"});

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export async function updateStatus(req,res){
  try {
    const {isCompleted} = req.body;
    const status = await Note.findByIdAndUpdate(req.params.id, {isCompleted}, {new:true})
    if(!status){
      return res.status(404).json({message: "Task not found"})
    }

    res.status(200).json({message: "Status updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateDate(req,res){
  try {
    const {dueDate} = req.body;
    const status = await Note.findByIdAndUpdate(req.params.id, {dueDate}, {new:true})
    if(!status){
      return res.status(404).json({message: "Task not found"})
    }

    res.status(200).json({message: "Date updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deletenotes(req, res){
  try {
    const {title,description, dueDate} = req.body;
    const deleteNote = await Note.findByIdAndDelete(req.params.id, {title,description, dueDate});

    if(!deleteNote) return res.status(404).json({message:"Note not found"});

    res.status(200).json({message:"Note deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


