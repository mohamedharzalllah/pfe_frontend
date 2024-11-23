import { useState } from "react";
import Navbar from "../../components/Navbar";
import ExamsCreatePrivate from "./createprivateexam";
import ExamsCreatePublic from "./createpublicexam";

const ExamsCreatePage = () => {
  const [examType, setExamType] = useState<'public' | 'private'>('public'); // Default is public exam

  // Handler to switch between public and private exam
  const handleExamTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamType(event.target.value as 'public' | 'private');
  };

  return (
    <div>
      <Navbar />

      <div className="exam-type-selection">
        <h1>Select Exam Type:</h1>
        <label>
          <input
            type="radio"
            value="public"
            checked={examType === 'public'}
            onChange={handleExamTypeChange}
          />
          Public Exam
        </label>
        <label>
          <input
            type="radio"
            value="private"
            checked={examType === 'private'}
            onChange={handleExamTypeChange}
          />
          Private Exam
        </label>
      </div>

      <div className="exam-form">
        {examType === 'public' ? (
          <ExamsCreatePublic />  // Render the Public Exam Creation Form
        ) : (
          <ExamsCreatePrivate /> // Render the Private Exam Creation Form
        )}
      </div>
    </div>
  );
};

export default ExamsCreatePage;
