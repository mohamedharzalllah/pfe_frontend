import { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateChapter = () => {
    const {courseId} = useParams();
    const [title,setTitle]=useState('');
    const [link, setLink] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, link: {} , text:{}});
    const navigate = useNavigate();


    const handleCreateChapter = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`http://localhost:3000/chapter`, {
                title:title ,
                text:text,
                link:link,
                courseId:courseId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
            }});
            setMessage('chapter created successfully');
            navigate(`/courses/update/${courseId}`);
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    title: responseErrors.title || {},
                    text: responseErrors.text || {},
                    link :responseErrors.link||{}
                });
            } else {
                setMessage('chapter creation failed');
            }
        }
    }

    return (
        <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2>Chapter Creation Page</h2>
        </div>

        <div className="card p-4 shadow">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              className="form-control"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && Object.values(errors.title).map((msg:any, index) => (
              <p key={index} className="text-danger">{msg}</p>
            ))}
          </div>

          {/* Link */}
          <div className="mb-3">
            <label className="form-label">Link:</label>
            <input
              className="form-control"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            {errors.link && Object.values(errors.link).map((msg:any, index) => (
              <p key={index} className="text-danger">{msg}</p>
            ))}
          </div>

          {/* Text */}
          <div className="mb-3">
            <label className="form-label">Text:</label>
            <textarea
              className="form-control"
              placeholder="Enter text"
              value={text}
              rows={2}

              onChange={(e) => setText(e.target.value)}
            />
            {errors.text && Object.values(errors.text).map((msg:any, index) => (
              <p key={index} className="text-danger">{msg}</p>
            ))}
          </div>

          {/* Create Chapter Button */}
          <div className="text-center mt-3">
            <button onClick={handleCreateChapter} className="btn btn-primary">
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

export default CreateChapter;