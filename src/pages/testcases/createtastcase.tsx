import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateTestCase = () => {
    const { id } = useParams();
    const [note, setNote] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ inputs: {}, expectedOutput: {}, note: {} });
    const [inputValues, setInputValues] = useState<string[]>([]);  // Specify the type of inputValues
    const [inputNb, setInputNb] = useState(0);  // Number of input fields
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/problem/${id}`);
                setInputNb(response.data.inputNb);
                setInputValues(Array(response.data.inputNb).fill(''));  // Initialize inputs as empty strings
            } catch (error) {
                console.error("Failed to fetch problem details", error);
            }
        };
        fetchProblem();
    }, [id]);

    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...inputValues];
        updatedInputs[index] = value;
        setInputValues(updatedInputs);
    };

    const handleCreateTestCase = async () => {
        try {
            await axios.post(`http://localhost:3000/testcase`, {
                inputs: inputValues,
                expectedOutput,
                note: parseInt(note),
                problemId: id
            });
            setMessage('Test case created successfully');
            navigate(`/problems/update/${id}`);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    inputs: responseErrors.inputs || {},
                    expectedOutput: responseErrors.expectedOutput || {},
                    note: responseErrors.note || {}
                });
            } else {
                setMessage('Test case creation failed');
            }
        }
    };

    return (
        <div >
            <Navbar />
            <div className="container mt-5">

            <div className="text-center mb-4">
                <h2>Test Case Creation Page</h2>
            </div>

            <div className="card p-4 shadow">
                {Array.from({ length: inputNb }).map((_, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">Input {index + 1}:</label>
                        <textarea
                            className="form-control"
                            placeholder={`Enter input ${index + 1}`}
                            value={inputValues[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        {errors.inputs && Object.values(errors.inputs).map((msg: any, i) => (
                            <p key={i} className="text-danger">{msg}</p>
                        ))}
                    </div>
                ))}

                <div className="mb-3">
                    <label className="form-label">Expected Output:</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter expected output"
                        value={expectedOutput}
                        onChange={(e) => setExpectedOutput(e.target.value)}
                    />
                    {errors.expectedOutput && Object.values(errors.expectedOutput).map((msg: any, index) => (
                        <p key={index} className="text-danger">{msg}</p>
                    ))}
                </div>

                <div className="mb-3">
                    <label className="form-label">Note:</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    {errors.note && Object.values(errors.note).map((msg: any, index) => (
                        <p key={index} className="text-danger">{msg}</p>
                    ))}
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <button onClick={handleCreateTestCase} className="btn btn-primary">
                        Create Test Case
                    </button>
                </div>

                {message && <p className="mt-3 text-success">{message}</p>}
            </div>
            </div>
        </div>
    );
}

export default CreateTestCase;
