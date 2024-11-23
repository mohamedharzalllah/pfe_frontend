import { useState, useEffect } from "react";
import axios from "axios";

const ExamsCreatePublic = () => {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [problems, setProblems] = useState([]); // All problems fetched from backend
    const [selectedProblems, setSelectedProblems] = useState<number[]>([]); // Selected problem IDs for the exam
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, duration: {}, difficulty: {},problems:{}});
   

    // Fetch problems on page load
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/problem'); // Replace with your problems endpoint
                setProblems(response.data); // Assuming the backend returns an array of problems
            } catch (error) {
                setMessage('Failed to load problems.');
            }
        };

        fetchProblems();
    }, []);

    const handleCreate = async () => {
        const token = localStorage.getItem('token');
        try {
                await axios.post('http://localhost:3000/exam', {
                title: title,
                duration: parseInt(duration),
                difficulty: difficulty,
                problems: selectedProblems,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage('Exam created successfully');
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    title: responseErrors.title || {},
                    duration: responseErrors.duration || {},
                    difficulty: responseErrors.difficulty || {},
                    problems:responseErrors.problems||{}
                }); 
            } else {
                setMessage('Exam creation failed');
            }
        }
    };

    // Toggle problem selection
    const toggleProblemSelection = (problemId: number) => {
        if (selectedProblems.includes(problemId)) {
            setSelectedProblems(selectedProblems.filter(id => id !== problemId));
        } else {
            setSelectedProblems([...selectedProblems, problemId]);
        }
    };

    return (
        <div>
            <div>Exam Creation Page</div>
            <div>
                <div>
                    <h1>Title:</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && Object.values(errors.title).map((msg: any, index) => (
                        <p key={index} style={{ color: 'red' }}>{msg}</p>
                    ))}
                </div>

                <div>
                    <h1>Duration (in minutes):</h1>
                    <input
                        type="number"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    {errors.duration && Object.values(errors.duration).map((msg: any, index) => (
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
                    {errors.difficulty && Object.values(errors.difficulty).map((msg: any, index) => (
                        <p key={index} style={{ color: 'red' }}>{msg}</p>
                    ))}
                </div>

                <div>
                    <h1>Select Problems:</h1>
                    <div>
                        {problems.length === 0 ? (
                            <p>Loading problems...</p>
                        ) : (
                            problems.map((problem: any) => (
                                <div key={problem.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={problem.id}
                                            onChange={() => toggleProblemSelection(problem.id)}
                                            checked={selectedProblems.includes(problem.id)}
                                        />
                                        {problem.title} (ID: {problem.id})
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                    {errors.problems && Object.values(errors.problems).map((msg: any, index) => (
                        <p key={index} style={{ color: 'red' }}>{msg}</p>
                    ))}
                </div>

                <button onClick={handleCreate}>
                    Create Exam
                </button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ExamsCreatePublic;
