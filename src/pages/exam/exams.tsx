import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ExamDeleteButton from "../../components/exam/deleteExam";

const Exams = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/exam');
                setExams(response.data);
                setLoading(false);
            } catch (err:any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchExams();
    }, []);
    const refreshExams = async () => {
        try {
          const response = await axios.get('http://localhost:3000/exam');
          setExams(response.data);
        } catch (err:any) {
          setError(err.message);
        }
      };
      

    return (
        <div>
            <Navbar />
            <h1>Exams</h1>
            <button className="button"><Link to='/exams/create'>Create</Link></button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="problems-container">
                {exams.map((exam:any ) => (
                    <div key={exam.id} className="problem-item">
                        
                        <div className="problem-title">{exam.title}</div>
                        <div className="problem-difficulty">{exam.difficulty}</div>
                        <ExamDeleteButton id={exam.id} onDelete={refreshExams} />
                        <button className="button" onClick={()=>navigate(`/Exams/update/${exam.id}`)}>update</button>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  
  export default Exams;