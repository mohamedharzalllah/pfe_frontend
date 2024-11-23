import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/problem.css";
import "../css/button.css";

const ProblemsSelection = () => {
  const { examId } = useParams<{ examId: string }>();
  const [problems, setProblems] = useState<any[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useState(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/problem");
        setProblems(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProblems();
  });

  const handleSelectProblem = (problemId: number) => {
    const updatedSelectedProblems = new Set(selectedProblems);
    if (updatedSelectedProblems.has(problemId)) {
      updatedSelectedProblems.delete(problemId);
    } else {
      updatedSelectedProblems.add(problemId);
    }
    setSelectedProblems(updatedSelectedProblems);
  };

  const handleSelectAll = () => {
    const allProblemIds = problems.map((problem) => problem.id);
    setSelectedProblems(new Set(allProblemIds));
  };

  const handleDeselectAll = () => {
    setSelectedProblems(new Set());
  };

  const handleConfirmSelection = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3000/exam/${examId}`,
        Array.from(selectedProblems),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      navigate(`/exams`); // Navigate to exam details page or wherever you want
    } catch (err: any) {
      setError(err.message);
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1>Select Problems for Exam</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button className="button" onClick={handleSelectAll}>
          Select All
        </button>
        <button className="button" onClick={handleDeselectAll}>
          Deselect All
        </button>
      </div>

      <div className="problems-container">
        {problems.map((problem) => (
          <div key={problem.id} className="problem-item">
            <input
              type="checkbox"
              checked={selectedProblems.has(problem.id)}
              onChange={() => handleSelectProblem(problem.id)}
            />
            <div className="problem-title">{problem.title}</div>
            <div className="problem-difficulty">{problem.difficulty}</div>
          </div>
        ))}
      </div>

      <button className="button" onClick={handleConfirmSelection}>
        Confirm Selection
      </button>
    </div>
  );
};

export default ProblemsSelection;
