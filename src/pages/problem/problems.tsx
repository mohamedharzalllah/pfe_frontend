import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProblemDeleteButton from "../../components/problem/deleteproblem";
import '../../css/bootstrap.min.css'


interface Problem {
  id: number;
  title: string;
  difficulty: string;
  // Add other properties as needed
}

const Problems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const refreshProblems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/problem");
      setProblems(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>  
    <Navbar />
    <div className="container mt-5">
    <div className="text-center mb-4">
      <h2>Problems</h2>
    </div>
    
    {/* Create Button */}
    <div className="d-flex justify-content-end mb-3">
      <Link className="btn btn-primary" to="/problems/create">Create</Link>
    </div>
  
    {/* Loading and Error Messages */}
    {loading && <p className="text-center text-secondary">Loading...</p>}
    {error && <p className="text-center text-danger">{error}</p>}
  
    {/* Problems Table */}
    <div className="card p-4 shadow">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Difficulty</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => {
              const rowClasses = ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark"];
              const rowClass = rowClasses[index % rowClasses.length];
  
              return (
                <tr key={problem.id} className={rowClass}>
                  <td 
                    onClick={() => navigate(`/problem/${problem.id}`)}
                    style={{ cursor: "pointer" }}
                    className="problem-link"
                  >
                    {problem.title}
                  </td>
                  <td>{problem.difficulty}</td>
                  <td>
                    <ProblemDeleteButton id={problem.id} onDelete={refreshProblems} />
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => navigate(`/problems/update/${problem.id}`)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
  
  );
};

export default Problems;
