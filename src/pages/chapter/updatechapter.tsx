import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateChapter = () => {
    const {id} = useParams();
    const [title,setTitle]=useState('');
    const [link, setLink] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, link: {} , text:{}});
    const navigate = useNavigate();
   
    useEffect(() => {
        const fetchChapter = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/chapter/${id}`);
            const chapter = response.data;
            console.log('Fetched chapter:', chapter); // Debugging log

            setTitle(chapter.title);
            setLink(chapter.link)
            setText(chapter.text)
        } catch (error:any) {
            console.error('Failed to fetch chapter:', error); // Debugging log
            setMessage('Failed to fetch chapter');
        }
    };

    if (id !== null) {
        fetchChapter();
    }
}, [id]);

    const handleUpdateChapter = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:3000/chapter/${id}`, {
                title:title ,
                text:text,
                link:link
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
            }});
            setMessage('chapter created successfully');
            navigate(-1);
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
          <h2>Chapter Update Page</h2>
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
            {errors.title && Object.values(errors.title).map((msg:any , index) => (
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
            {errors.link && Object.values(errors.link).map((msg:any , index) => (
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

          {/* Update Button */}
          <div className="text-center">
            <button onClick={handleUpdateChapter} className="btn btn-primary">
              Update Chapter
            </button>
          </div>

          {/* Success or Error Message */}
          {message && <p className="text-center mt-3 text-success">{message}</p>}
        </div>
      </div>
    </div>
    )
}

export default UpdateChapter;