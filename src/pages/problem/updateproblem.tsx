import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TestCaseDeleteButton from "../../components/testcase/deletetestcase";

const ProblemsUpdate = () => {
    const [inputNb, setInputNb] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ title: {}, duration: {}, difficulty: {}, description: {} ,inputNb:{}});
    const [problemId, setProblemId] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [testCases, setTestCases] = useState([]);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/problem/${id}`);
                const problem = response.data;
                console.log('Fetched problem data:', problem); // Debugging log

                setTitle(problem.title);
                setDuration(problem.duration.toString());
                setDifficulty(problem.difficulty);
                setDescription(problem.description);
                setProblemId(problem.id);
                setInputNb(problem.inputNb)
            } catch (error:any) {
                console.error('Failed to fetch problem data:', error); // Debugging log
                setMessage('Failed to fetch problem data');
            }
        };

        const fetchTestCases = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/testcase/problem/${id}`);
                const testCases = response.data;
                console.log('Fetched test cases:', testCases); // Debugging log

                setTestCases(testCases);
            } catch (error:any) {
                console.error('Failed to fetch test cases:', error); // Debugging log
                setMessage('Failed to fetch test cases');
            }
        };

        if (id !== null) {
            fetchProblem();
            fetchTestCases();
        }
    }, [id]);

    const handleUpdate = async () => {
        // const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:3000/problem/${id}`, {
                title: title,
                duration: parseInt(duration),
                difficulty: difficulty,
                description: description, 
                inputNb:parseInt(inputNb), 
            // }, {
            //     headers: {
            //         'Authorization': token 
            //     }
            });

            setMessage('Problem updated successfully');
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    title: responseErrors.title || {},
                    duration: responseErrors.duration || {},
                    description: responseErrors.description || {},
                    difficulty: responseErrors.difficulty || {},
                    inputNb:responseErrors.inputNb || {}
                });
            } else {
                setMessage('Problem update failed');
            }
        }
    };

    const handleCreateTestCase = () => {
        if (problemId) {
            navigate(`/testcase/${problemId}`);
        } else {
            setMessage('Please create the problem first.');
        }
    };
    const refreshtestcases = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/testcase/problem/${id}`);
          setTestCases(response.data);
        } catch (err:any) {
          setMessage(err.message);
        }
      };
      

    return (
        <div >
  <Navbar />
  <div className="container mt-5">
  {/* Page Title */}
  <div className="text-center mb-4">
    <h2>Problem Update Page</h2>
  </div>

  <div className="card p-4 shadow">
    {/* Title Field */}
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

    {/* Duration Field */}
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


    {/* Description Field */}
    <div className="mb-3">
      <label className="form-label">Description:</label>
      <textarea
        className="form-control"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      {errors.description && Object.values(errors.description).map((msg:any, index) => (
        <p key={index} className="text-danger">{msg}</p>
      ))}
    </div>

    {/* Difficulty Selection */}
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
      {errors.difficulty && Object.values(errors.difficulty).map((msg:any, index) => (
        <p key={index} className="text-danger">{msg}</p>
      ))}
    </div>

    {/* Update Button */}
    <div className="d-flex justify-content-end mt-3">
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update Problem
      </button>
    </div>

    {/* Success Message */}
    {message && <p className="mt-3 text-success">{message}</p>}
  </div>

  {/* Test Cases Section */}
  <div className="mt-5">
    <h3>Test Cases</h3>
    {testCases.map((testcase:any) => (
      <div key={testcase.id} className="card mb-3 p-3">
        <div><strong>Input:</strong> {testcase.input}</div>
        <div><strong>Expected Output:</strong> {testcase.expectedOutput}</div>
        
        <div className="d-flex justify-content-end mt-2">
          <TestCaseDeleteButton id={testcase.id} onDelete={refreshtestcases} />
          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate(`/testcase/update/${testcase.id}`)}
          >
            Update
          </button>
        </div>
      </div>
    ))}

    {/* Create Test Case Button */}
    <div className="d-flex justify-content-end mt-3">
      <button
        className="btn btn-success"
        onClick={handleCreateTestCase}
        disabled={!problemId}
      >
        Create Test Case
      </button>
    </div>
  </div>
</div>
</div>
        
    );
};

export default ProblemsUpdate;
