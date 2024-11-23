import { useState, useEffect } from "react";
import axios from "axios";

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  // Add other properties if necessary
}

interface ProblemDetailsProps {
  id: string; // Prop for problem ID
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ id }) => {
  const [problem, setProblem] = useState<Problem | null>(null); // State to hold the problem details
const [loading, setLoading] = useState(true);       
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/problem/${id}`);
        setProblem(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {problem && (
        <div>
          <h1>{problem.title}</h1>
          <p><strong>Description:</strong> {problem.description}</p>
          <p><strong>Difficulty:</strong> {problem.difficulty}</p>
          {/* Add more problem details here */}
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;
