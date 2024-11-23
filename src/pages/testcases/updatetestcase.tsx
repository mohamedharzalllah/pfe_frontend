import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTestCase = () => {
    const { id } = useParams();
    const [inputValues, setInputValues] = useState<string[]>([]);
    const [note, setNote] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ inputs: {}, expectedOutput: {}, note: {} });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTestCase = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/testcase/${id}`);
                const testCase = response.data;
                console.log('Fetched test case:', testCase);

                const { inputNb } = testCase.problem;
                const inputs = testCase.inputs.map((input:any ) => input.inputValue);

                // Initialize input fields to match the problem's inputNb requirement
                const initializedInputs= Array.from({ length: inputNb }, (_, i) => inputs[i] || '');

                setInputValues(initializedInputs);
                setExpectedOutput(testCase.expectedOutput);
                setNote(testCase.note);
            } catch (error) {
                console.error('Failed to fetch test case:', error);
                setMessage('Failed to fetch test case');
            }
        };

        if (id) {
            fetchTestCase();
        }
    }, [id]);

    const handleInputChange = (index:number, value:string) => {
        const updatedInputs = [...inputValues];
        updatedInputs[index] = value;
        setInputValues(updatedInputs);
    };

    const handleUpdateTestCase = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:3000/testcase/${id}`, {
                inputs: inputValues,
                expectedOutput,
                note: parseInt(note),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Test case updated successfully');
            navigate(-1);
        } catch (error:any ) {
            if (error.response && error.response.data && error.response.data.message) {
                const responseErrors = error.response.data.message;
                setErrors({
                    inputs: responseErrors.inputs || {},
                    expectedOutput: responseErrors.expectedOutput || {},
                    note: responseErrors.note || {}
                });
            } else {
                setMessage('Test case update failed');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
            <div className="text-center mb-4">
                <h2>Test Case Updating Page</h2>
            </div>

            <div className="card p-4 shadow">
                {/* Dynamic Input Fields */}
                {inputValues.map((value, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">Input {index + 1}:</label>
                        <textarea
                            className="form-control"
                            placeholder={`Enter input ${index + 1}`}
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            rows={2}
                        />
                        {errors.inputs && Object.values(errors.inputs).map((msg:any, i) => (
                            <p key={i} className="text-danger">{msg}</p>
                        ))}
                    </div>
                ))}

                {/* Expected Output Field */}
                <div className="mb-3">
                    <label className="form-label">Expected Output:</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter expected output"
                        value={expectedOutput}
                        onChange={(e) => setExpectedOutput(e.target.value)}
                        rows={4}
                    />
                    {errors.expectedOutput && Object.values(errors.expectedOutput).map((msg:any , index) => (
                        <p key={index} className="text-danger">{msg}</p>
                    ))}
                </div>

                {/* Note Field */}
                <div className="mb-3">
                    <label className="form-label">Note:</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    {errors.note && Object.values(errors.note).map((msg:any, index) => (
                        <p key={index} className="text-danger">{msg}</p>
                    ))}
                </div>

                {/* Update Button */}
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary" onClick={handleUpdateTestCase}>
                        Update Test Case
                    </button>
                </div>

                {/* Success Message */}
                {message && <p className="mt-3 text-success">{message}</p>}
            </div>
            </div>
        </div>
    );
};

export default UpdateTestCase;
