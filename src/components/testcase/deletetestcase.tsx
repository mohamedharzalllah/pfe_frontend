import axios from 'axios';

interface TestCaseDeleteButtonProps {
  id: number;
  onDelete: () => void; // Callback function prop
}

const TestCaseDeleteButton: React.FC<TestCaseDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/testcase/${id}`);
      console.log('TestCase deleted successfully');
      onDelete(); // Call the callback function to trigger a re-render
    } catch (error) {
      console.error('Error deleting testcase:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default TestCaseDeleteButton;
