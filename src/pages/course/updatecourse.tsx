import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChapterDeleteButton from "../../components/chapter/deleteChapter";

const CoursesUpdate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [link, setLink] = useState('');
    const [certified, setCertified ] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, duration: {}, link: {}, certified: {} ,description:{} });
    const [courseId, setCourseId] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [chapters, setChapters] = useState([]);
    const handleOptionChange = (event: any ) => {
        setCertified(event.target.value === 'true');
    };
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/course/${id}`);
                const course = response.data;
                console.log('Fetched course data:', course); // Debugging log
                setTitle(course.title);
                setDuration(course.duration.toString());
                setLink(course.link);
                setCertified(course.certified)
                setDescription(course.description);
                setCourseId(course.id);
            } catch (error:any) {
                console.error('Failed to fetch course data:', error); // Debugging log
                setMessage('Failed to fetch course data');
            }
        };

        const fetchChapters = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/chapter/course/${id}`);
                const chapters = response.data;
                console.log('Fetched chapters:', chapters); // Debugging log

                setChapters(chapters);
            } catch (error:any) {
                console.error('Failed to fetch chapters:', error); // Debugging log
                setMessage('Failed to fetch chapters');
            }
        };

        if (id !== null) {
            fetchCourse();
            fetchChapters();
        }
    }, [id]);

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:3000/course/${id}`, {
                title: title,
                duration: parseInt(duration),
                link:link,
                certified:certified,
                description: description
            }, {
                headers: {
                    'Authorization': token 
                }
            });

            setMessage('Course updated successfully');
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    title: responseErrors.title || {},
                    duration: responseErrors.duration || {},
                    description: responseErrors.description || {},
                    certified: responseErrors.certified || {},
                    link: responseErrors.link || {}
                });
            } else {
                setMessage('Course update failed');
            }
        }
    };

    const handleCreateChapter = () => {
        if (courseId) {
            navigate(`/chapter/create/${courseId}`);
        } else {
            setMessage('Please create the course first.');
        }
    };
    const refreshChapters = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/chapter/course/${id}`);
            setChapters(response.data);
        } catch (err:any) {
            setMessage(err.message);
        }
      };
      

    return (
        <div>
        <Navbar />
        <div className="container mt-5">
          <div className="text-center mb-4">
            <h2>Course Update Page</h2>
          </div>
  
          <div className="card p-4 shadow">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && Object.values(errors.title).map((msg:any, index) => (
                <p key={index} className="text-danger">{msg}</p>
              ))}
            </div>
  
            {/* Duration */}
            <div className="mb-3">
              <label className="form-label">Duration:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              {errors.duration && Object.values(errors.duration).map((msg:any, index) => (
                <p key={index} className="text-danger">{msg}</p>
              ))}
            </div>
  
            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              {errors.description && Object.values(errors.description).map((msg:any, index) => (
                <p key={index} className="text-danger">{msg}</p>
              ))}
            </div>
  
            {/* Link */}
            <div className="mb-3">
              <label className="form-label">Link:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              {errors.link && Object.values(errors.link).map((msg:any, index) => (
                <p key={index} className="text-danger">{msg}</p>
              ))}
            </div>
  
            {/* Certified */}
            <div className="mb-3">
              <label className="form-label">Certified:</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="certified-true"
                  value="true"
                  checked={certified === true}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label" htmlFor="certified-true">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="certified-false"
                  value="false"
                  checked={certified === false}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label" htmlFor="certified-false">
                  No
                </label>
              </div>
              {errors.certified && Object.values(errors.certified).map((msg:any, index) => (
                <p key={index} className="text-danger">{msg}</p>
              ))}
            </div>
  
            {/* Update Button */}
            <div className="text-center mt-3">
              <button onClick={handleUpdate} className="btn btn-primary">
                Update Course
              </button>
            </div>
  
            {/* Success or Error Message */}
            {message && <p className="mt-3 text-success">{message}</p>}
          </div>
  
          {/* Chapters Section */}
          <div className="mt-5">
            <h3>Chapters:</h3>
            <div className="card p-3 shadow">
              {chapters.map((chapter:any) => (
                <div key={chapter.id} className="d-flex justify-content-between align-items-center mb-2">
                  <span className="chapter-title">{chapter.title}</span>
                  <div>
                    <ChapterDeleteButton id={chapter.id}  onDelete={refreshChapters}/>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/chapter/update/${chapter.id}`)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <button onClick={handleCreateChapter} className="btn btn-primary" disabled={!courseId}>
                Create Chapter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CoursesUpdate;
