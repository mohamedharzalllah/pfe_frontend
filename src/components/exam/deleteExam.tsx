import axios from 'axios';

interface ExamDeleteButtonProps {
  id: number;
  onDelete: () => void; // Callback function prop
}

const ExamDeleteButton: React.FC<ExamDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/exam/${id}`);
      console.log('exam deleted successfully');
      onDelete(); // Call the callback function to trigger a re-render
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <button className="btn btn-primary ml-2" onClick={handleDelete}>Delete</button>
  );
};

export default ExamDeleteButton;
