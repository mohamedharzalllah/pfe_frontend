import axios from 'axios';

interface DeleteProblemFromExamButtonProps {
  problemId:number
  id: number;
  onDelete: () => void; // Callback function prop
}

const DeleteProblemFromExamButton: React.FC<DeleteProblemFromExamButtonProps> = ({ id, onDelete ,problemId}) => {
  const handleDelete = async () => {
    try {
        await axios.delete(`http://localhost:3000/exam/problem/${id}`, {
            data: { problemId: problemId }  // Add the problemId in the request body using data key
        });
        console.log('problem deleted successfully');
        onDelete(); // Call the callback function to trigger a re-render
    } catch (error) {
      console.error('Error deleting problem from exam:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteProblemFromExamButton;
