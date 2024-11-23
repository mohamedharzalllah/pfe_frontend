import axios from 'axios';

interface ChapterDeleteButtonProps {
  id: number;
  onDelete: () => void; // Callback function prop
}

const ChapterDeleteButton: React.FC<ChapterDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/chapter/${id}`);
      console.log('Chapter deleted successfully');
      onDelete(); // Call the callback function to trigger a re-render
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  return (
    <button  className="btn btn-primary ml-2" onClick={handleDelete}>Delete</button>
  );
};

export default ChapterDeleteButton;