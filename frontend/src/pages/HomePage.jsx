import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import TaskNotFound from "../components/TaskNotFound.jsx";
import api from "../lib/axios.js";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching the tasks", error);

        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* <div className='text-center'><h1 className='text-2xl text-primary font-bold font-mono tracking-tight mt-6'>Upcoming Tasks</h1></div> */}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading your tasks...
          </div>
        )}

        {notes.length === 0  && !loading && <TaskNotFound />}
        {notes.length > 0  && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
