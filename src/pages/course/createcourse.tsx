import { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CoursesCreate =() => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [link, setLink] = useState('');
    const [certified, setCertified ] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, duration: {}, link: {}, certified: {} ,description:{} });
    const [courseId, setCourseId] = useState(null);
    const navigate = useNavigate();


    const handleOptionChange = (event: any ) => {
      setCertified(event.target.value === 'true');
    };
    const handelCreateCourse= async  ()=> {
        const token = localStorage.getItem('token');
        try {
            const response=await axios.post('http://localhost:3000/course',{
            title:title ,
            description:description ,
            duration:parseInt(duration),
            link:link,
            certified:certified,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }});
            console.log('course created successfully');
            setCourseId(response.data.id);
            setMessage('Course created successfully');
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    title: responseErrors.title || {},
                    duration: responseErrors.duration || {},
                    link: responseErrors.link || {},
                    certified: responseErrors.certified || {},
                    description: responseErrors.description ||{},
                });
            } else {
                setMessage('course creation failed');
            }
        }
    }
    const handleCreateChapter = () => {
        if (courseId) {
            navigate(`/chapter/create/${courseId}`);
        } else {
            setMessage('Please create the course first.');
        }
    }
    
  
    return (
        <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2>Course Creation Page</h2>
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
            {errors.title && Object.values(errors.title).map((msg:any , index) => (
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
            {errors.link && Object.values(errors.link).map((msg:any , index) => (
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

          {/* Buttons */}
          <div className="d-flex gap-2 mt-3">
            <button onClick={handelCreateCourse} className="btn btn-primary">
              Create Course
            </button>
            <button onClick={handleCreateChapter} className="btn btn-secondary" disabled={!courseId}>
              Create Chapter
            </button>
          </div>

          {/* Success or Error Message */}
          {message && <p className="mt-3 text-success">{message}</p>}
        </div>
      </div>
    </div>
    )
}
export default CoursesCreate;
