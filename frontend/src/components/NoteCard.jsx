import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import {Link} from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes}) => {
    const handleDelete = async (e,id) => {
        e.preventDefault(); //used to get rid of the default navigation behaviour
        if(!window.confirm("Are you sure to delete this task?")){
            return;
        }

        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => (prev.filter(note => note._id != id))) //used to get rid of the deleted task from UI
            toast.success("Task is deleted")
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete the Task")
        }
    }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
        <div className="card-body bg-base-200">
            <h3 className="card-title text-base-content font-mono tracking-tight">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3 block">{note.description}</p>
            <span className="text-sm text-base-content/70 font-bold">Status : {note.isCompleted ? "Completed" : "Pending"}</span>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">Due Date : {formatDate(note.dueDate)}</span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4"/>
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default NoteCard;
