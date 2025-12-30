import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitUI from '../components/RateLImitUI.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import TaskNotFound from '../components/TaskNotFound.jsx';


const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async ()=> {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimit(false)
      } catch (error) {
        console.log("Error fetching the Notes", error);
        if(error.response.status === 429){
          setIsRateLimit(true)
        }
        else{
          toast.error("Failed to load notes")
        }
      }
      finally{
        setLoading(false)
      }
    }

    fetchNotes();
  },[])
  return (
    <div className="min-h-screen">
      <Navbar/>

      {isRateLimit && <RateLimitUI/>}

      {/* <div className='text-center'><h1 className='text-2xl text-primary font-bold font-mono tracking-tight mt-6'>Upcoming Tasks</h1></div> */}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading your tasks...</div>}

        {notes.length === 0 && !isRateLimit && <TaskNotFound/>}
        {notes.length > 0 && !isRateLimit && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
