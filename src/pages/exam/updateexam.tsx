import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProblemFromExamButton from "../../components/deleteProblemFromExam";

const ExamsUpdate = () => {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, duration: {}, difficulty: {} });
    const navigate = useNavigate();
    const { id } = useParams();
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/exam/${id}`);
                const exam = response.data;
                console.log('Fetched exam data:', exam);  // Debugging log

                setTitle(exam.title);
                setDuration(exam.duration.toString());
                setDifficulty(exam.difficulty);
            } catch (error) {
                console.error('Failed to fetch exam data:', error);  // Debugging log
                setMessage('Failed to fetch exam data');
            }
        };

        const fetchProblems = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/exam/problems/${id}`);
                const problems = response.data;
                console.log('Fetched problems:', problems);  // Debugging log

                setProblems(problems);
            } catch (error) {
                console.error('Failed to fetch problems:', error);  // Debugging log
                setMessage('Failed to fetch problems');
            }
        };

        if (id !== null) {
            fetchExam();
            fetchProblems();
        }
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.patch(`http://localhost:3000/exam/${id}`, {
                title: title,
                duration: parseInt(duration),
                difficulty: difficulty,
            });

            setMessage('Exam updated successfully');
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    title: responseErrors.title || {},
                    duration: responseErrors.duration || {},
                    difficulty: responseErrors.difficulty || {}
                });
            } else {
                setMessage('Exam update failed');
            }
        }
    };

    const refreshProblems = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/exam/problems/${id}`);
            setProblems(response.data);
        } catch (err:any) {
            setMessage(err.message);
        }
    };

    const handleAddProblems = () => {
        if (id) {
            navigate(`/problemsselection/${id}`);
        } else {
            setMessage('Please create the exam first.');
        }
    }

    return (
        <div>
            <Navbar />
            <div>Exam Update Page</div>
            <div>
                <div>
                    <h1>Title:</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && Object.values(errors.title).map((msg:any, index) => (
                        <p key={index} style={{ color: 'red' }}>{msg}</p>
                    ))}
                </div>
                <div>
                    <h1>Duration:</h1>
                    <input
                        type="number"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    {errors.duration && Object.values(errors.duration).map((msg:any, index) => (
                        <p key={index} style={{ color: 'red' }}>{msg}</p>
                    ))}
                </div>
                <div>
                    <h1>Difficulty:</h1>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                        <option value="">Select difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    {errors.difficulty && Object.values(errors.difficulty).map((msg:any, index) => (
                        <p key={index} style={{ color: 'red' }}>{msg}</p>
                    ))}
                </div>
                <button onClick={handleUpdate}>
                    Update Exam
                </button>
                {message && <p>{message}</p>}
            </div>

            <div>
                <h1>Problems:</h1>
                <button onClick={handleAddProblems} disabled={!id}>
                    Select Problems
                </button>
                {problems.map((problem:any , index) => (
                    <div key={problem.id}>
                        <div>
                            <div>Problem {index + 1}</div>
                            <div>{problem.title}</div>
                            <div>{problem.difficulty}</div>
                            <DeleteProblemFromExamButton id={problem.id} onDelete={refreshProblems} problemId={problem.id}/>
                            <button className="button" onClick={() => navigate(`/problems/update/${problem.id}`)}>Update</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamsUpdate;
