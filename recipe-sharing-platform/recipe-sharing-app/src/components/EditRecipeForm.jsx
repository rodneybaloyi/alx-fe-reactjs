import { useRecipeStore } from '../recipeStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeleting(true);
    
    try {
      deleteRecipe(id);
      alert('Recipe deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error deleting recipe. Please try again.');
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        backgroundColor: '#ffebee',
        borderRadius: '4px',
        border: '1px solid #f44336'
      }}>
        <span style={{
          fontSize: '14px',
          color: '#d32f2f',
          fontWeight: 'bold'
        }}>
          Are you sure?
        </span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            padding: '8px 16px',
            backgroundColor: isDeleting ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!isDeleting) {
              e.target.style.backgroundColor = '#d32f2f';
            }
          }}
          onMouseLeave={(e) => {
            if (!isDeleting) {
              e.target.style.backgroundColor = '#f44336';
            }
          }}
        >
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </button>
        <button
          onClick={handleCancel}
          disabled={isDeleting}
          style={{
            padding: '8px 16px',
            backgroundColor: isDeleting ? '#ccc' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!isDeleting) {
              e.target.style.backgroundColor = '#555';
            }
          }}
          onMouseLeave={(e) => {
            if (!isDeleting) {
              e.target.style.backgroundColor = '#666';
            }
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleDelete}
      style={{
        padding: '12px 24px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#d32f2f';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#f44336';
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;