import axios from 'axios';

interface CourseDeleteButtonProps {
  id: number;
  onDelete: () => void; // Callback function prop
}

const CourseDeleteButton: React.FC<CourseDeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/course/${id}`);
      console.log('Course deleted successfully');
      onDelete(); // Call the callback function to trigger a re-render
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <button className="btn btn-primary ml-2" onClick={handleDelete}>Delete</button>
  );
};

export default CourseDeleteButton;
