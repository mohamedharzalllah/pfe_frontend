import { useState, useEffect } from "react";
import axios from "axios";

const ExamsCreatePrivate = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [problems, setProblems] = useState([]); // All problems fetched from backend
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]); // Selected problem IDs for the exam
  const [contestants, setContestants] = useState([]); // All contestants fetched from backend
  const [selectedContestants, setSelectedContestants] = useState<number[]>([]); // Selected contestant IDs for the exam
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ title: {}, duration: {}, difficulty: {}, problems: {}, contestants: {}, date: {}, time: {} });

  // Fetch problems and contestants on page load
  useEffect(() => {
    const fetchProblemsAndContestants = async () => {
      try {
        const problemsResponse = await axios.get('http://localhost:3000/problem'); // Replace with your problems endpoint
        setProblems(problemsResponse.data); // Assuming the backend returns an array of problems

        const contestantsResponse = await axios.get('http://localhost:3000/user'); // Replace with your contestants/users endpoint
        setContestants(contestantsResponse.data); // Assuming the backend returns an array of users/contestants
      } catch (error) {
        setMessage('Failed to load problems or contestants.');
      }
    };

    fetchProblemsAndContestants();
  }, []);

  const handleCreate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/privateexam', {
        title: title,
        duration: parseInt(duration),
        difficulty: difficulty,
        problems: selectedProblems,
        contestants: selectedContestants,
        date: new Date(date),
        time: time,
      // }, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      });
      console.log(date)
      setMessage('Private exam created successfully');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        const responseErrors = error.response.data.message;
        console.log(new Date(date))

        setErrors({
          title: responseErrors.title || {},
          duration: responseErrors.duration || {},
          difficulty: responseErrors.difficulty || {},
          problems: responseErrors.problems || {},
          contestants: responseErrors.contestants || {},
          date: responseErrors.date || {},
          time: responseErrors.time || {}
        });
      } else {
        setMessage('Private exam creation failed');
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

  // Toggle contestant selection
  const toggleContestantSelection = (contestantId: number) => {
    if (selectedContestants.includes(contestantId)) {
      setSelectedContestants(selectedContestants.filter(id => id !== contestantId));
    } else {
      setSelectedContestants([...selectedContestants, contestantId]);
    }
  };

  return (
    <div>
      <div>Private Exam Creation Page</div>
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

        <div>
          <h1>Select Contestants:</h1>
          <div>
            {contestants.length === 0 ? (
              <p>Loading contestants...</p>
            ) : (
              contestants.map((contestant: any) => (
                <div key={contestant.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={contestant.id}
                      onChange={() => toggleContestantSelection(contestant.id)}
                      checked={selectedContestants.includes(contestant.id)}
                    />
                    {contestant.name} (ID: {contestant.id})
                  </label>
                </div>
              ))
            )}
          </div>
          {errors.contestants && Object.values(errors.contestants).map((msg: any, index) => (
            <p key={index} style={{ color: 'red' }}>{msg}</p>
          ))}
        </div>

        <div>
          <h1>Date:</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && Object.values(errors.date).map((msg: any, index) => (
            <p key={index} style={{ color: 'red' }}>{msg}</p>
          ))}
        </div>

        <div>
          <h1>Time:</h1>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && Object.values(errors.time).map((msg: any, index) => (
            <p key={index} style={{ color: 'red' }}>{msg}</p>
          ))}
        </div>

        <button onClick={handleCreate}>
          Create Private Exam
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ExamsCreatePrivate;
