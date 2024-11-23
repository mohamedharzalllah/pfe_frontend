import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import CourseDeleteButton from "../../components/course/deleteCourse";
import '../../css/bootstrap.min.css'


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/course");
        setCourses(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const refreshCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/course");
      setCourses(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2>Courses</h2>
        </div>

        {/* Create Button */}
        <div className="d-flex justify-content-end mb-3">
          <Link className="btn btn-primary" to="/courses/create">
            Create
          </Link>
        </div>

        {/* Loading and Error Messages */}
        {loading && <p className="text-center text-secondary">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* Courses Table */}
        <div className="card p-4 shadow">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course:any , index) => {
                  const rowClasses = [
                    "table-primary",
                    "table-secondary",
                    "table-success",
                    "table-danger",
                    "table-warning",
                    "table-info",
                    "table-light",
                    "table-dark",
                  ];
                  const rowClass = rowClasses[index % rowClasses.length];

                  return (
                    <tr key={course.id} className={rowClass}>
                      <td
                        onClick={() => navigate(`/course/${course.id}`)}
                        style={{ cursor: "pointer" }}
                        className="course-link"
                      >
                        {course.title}
                      </td>
                      <td>
                        <CourseDeleteButton id={course.id} onDelete={refreshCourses} />
                        <button
                          className="btn btn-primary ml-2"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents navigation when clicking "Update"
                            navigate(`/courses/update/${course.id}`);
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
  
  export default Courses;