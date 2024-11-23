import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

interface Chapter {
  id: number;
  title: string;
  
  // Add other properties as needed
}

interface Course {
  id: number;
  title: string;
  description: string;
  // Add other properties as needed
}

const CoursePage = () => {
  const { id } = useParams<{ id: string }>(); // Get course ID from the route params
  const [chapters, setChapters] = useState<Chapter[]>([]); // Should be an array of chapters
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook for navigation


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseResponse = await axios.get(`http://localhost:3000/course/${id}`);
        setCourse(courseResponse.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchChapters = async () => {
      try {
        const chapterResponse = await axios.get(`http://localhost:3000/chapter/course/${id}`);
        setChapters(chapterResponse.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourse();
    fetchChapters();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {/* Loading and Error Messages */}
        {loading && <p className="text-center text-secondary">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* Course Details */}
        {course && (
          <div>
            <div className="text-center mb-4">
              <h2>{course.title}</h2>
              <button
                className="btn btn-primary mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/courses/update/${course.id}`);
                }}
              >
                Update Course
              </button>
            </div>

            <div className="card p-4 shadow mb-4">
              <h3>Description</h3>
              <p>{course.description}</p>
            </div>

            {/* Chapters Table */}
            <div className="card p-4 shadow">
              <h3>Chapters</h3>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Chapter Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapters.map((chapter) => (
                      <tr
                        key={chapter.id}
                        onClick={() => navigate(`/chapter/${chapter.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{chapter.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
