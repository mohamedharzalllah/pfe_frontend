import { useState, useEffect } from "react";
import axios from "axios";

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  // Add other properties as needed
}

interface TestCasePageProps {
  id: string; // Expect the problem ID to be passed as a prop
}

const TestCasePage = ({ id }: TestCasePageProps) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]); // State to hold test cases
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/testcase/problem/${id}`);
        setTestCases(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTestCases();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && testCases.length === 0 && (
        <p>No test cases available for this problem.</p>
      )}
      {testCases.length > 0 && (
        <div>
          <h1>Examples:</h1>
          <ul>
            {testCases.map((testCase, index) => (
              <li key={testCase.id}>
                <h3>Test Case {index + 1}</h3>
                <p>
                  <strong>Input:</strong> <code>{testCase.input}</code>
                </p>
                <p>
                  <strong>Expected Output:</strong> <code>{testCase.expectedOutput}</code>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestCasePage;
