import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

interface Chapter {
  id: number;
  title: string;
  link:string; 
  text:string; 
  
  // Add other properties as needed
}


const ChapterPage = () => {
  const { id } = useParams<{ id: string }>(); // Get course ID from the route params
  const [chapter, setChapter] = useState<Chapter>(); // Should be an array of chapters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
      const fetchChapter = async () => {
      try {
        const chapterResponse = await axios.get(`http://localhost:3000/chapter/${id}`);
        setChapter(chapterResponse.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchChapter();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {/* Loading and Error Messages */}
        {loading && <p className="text-center text-secondary">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* Chapter Details */}
        {chapter && (
          <div>
            <div className="text-center mb-4">
              <h2>{chapter.title}</h2>
              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate(`/chapter/update/${chapter.id}`)}
              >
                Update Chapter
              </button>
            </div>

            {/* Video Link Section */}
            <div className="card p-4 shadow mb-4">
              <h3>Video Link</h3>
              <p>{chapter.link}</p>
            </div>

            {/* Text Section */}
            <div className="card p-4 shadow mb-4">
              <h3>Text</h3>
              <p>{chapter.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterPage;
