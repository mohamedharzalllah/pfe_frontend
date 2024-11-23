import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


const ProblemsCreate = () => {
    const [title, setTitle] = useState('');
    const [inputNb, setInputNb] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, duration: {}, difficulty: {}, description: {} ,inputNb:{}});
    const [problemId, setProblemId] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3000/problem', {
                title: title,
                duration: parseInt(duration),
                difficulty: difficulty,
                description: description,
                inputNb:parseInt(inputNb)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setProblemId(response.data.id);
            setMessage('Course created successfully');
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    title: responseErrors.title || {},
                    duration: responseErrors.duration || {},
                    description: responseErrors.description || {},
                    difficulty: responseErrors.difficulty || {},
                    inputNb:responseErrors.inputNb||{}
                });
            } else {
                setMessage('Problem creation failed');
            }
        }
    }

    const handleCreateTestCase = () => {
        if (problemId) {
            navigate(`/testcase/${problemId}`);
        } else {
            setMessage('Please create the problem first.');
        }
    }

    return (
        <div>
          <Navbar />
          <div className="container mt-5">

            <div className="text-center mb-4">
                <h2>Problem Creation Page</h2>
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
                {errors.duration && Object.values(errors.duration).map((msg:any , index) => (
                    <p key={index} className="text-danger">{msg}</p>
                ))}
                </div>
                {/* Number of inputs of the function */}
                <div className="mb-3">
                <label className="form-label">Number of inputs:</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter number of inputs"
                    value={inputNb}
                    onChange={(e) => setInputNb(e.target.value)}
                />
                {errors.duration && Object.values(errors.inputNb).map((msg:any , index) => (
                    <p key={index} className="text-danger">{msg}</p>
                ))}
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control form-control-lg"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}  // Adjust this number to increase or decrease the height
                    />
                    {errors.description && Object.values(errors.description).map((msg:any, index) => (
                        <p key={index} className="text-danger">{msg}</p>
                    ))}
                </div>


                {/* Difficulty */}
                <div className="mb-3">
                <label className="form-label">Difficulty:</label>
                <select
                    className="form-select"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    required
                >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                {errors.difficulty && Object.values(errors.difficulty).map((msg:any , index) => (
                    <p key={index} className="text-danger">{msg}</p>
                ))}
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2 mt-3">
                <button
                    onClick={handleCreateTestCase}
                    className="btn btn-secondary"
                    disabled={!problemId}
                >
                    Create Test Case
                </button>
                <button onClick={handleCreate} className="btn btn-primary">
                    Create Problem
                </button>
                </div>

                {/* Success or Error Message */}
                {message && <p className="mt-3 text-success">{message}</p>}
            </div>
        </div>
        </div>

    )
}

export default ProblemsCreate;
