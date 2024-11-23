import axios from 'axios';

interface ProblemDeleteButtonProps {
  id: number;
  onDelete: () => void; // Callback function prop
}

const ProblemDeleteButton: React.FC<ProblemDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/problem/${id}`);
      console.log('Problem deleted successfully');
      onDelete(); // Call the callback function to trigger a re-render
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  return (
    <button className="btn btn-primary ml-2" onClick={handleDelete}>Delete</button>
  );
};

export default ProblemDeleteButton;
