import mongoose from "mongoose";

//1.create a schema
//2. create a model based on that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema)  //Model for the given Schema

export default Note