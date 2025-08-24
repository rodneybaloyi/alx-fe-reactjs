import { useState } from 'react';
import { useRecipeStore } from '../recipeStore';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newRecipe = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString()
      };
      
      addRecipe(newRecipe);
      setTitle('');
      setDescription('');
      
      // Show success message and redirect after a short delay
      alert('Recipe added successfully!');
      setTimeout(() => {
        navigate('/');
      }, 500);
      
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Error adding recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label 
            htmlFor="title"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Recipe Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title (e.g., Chocolate Chip Cookies)"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2196F3';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />
        </div>

        <div>
          <label 
            htmlFor="description"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe, ingredients, preparation steps, cooking time, etc."
            required
            rows={6}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical',
              minHeight: '120px',
              fontFamily: 'Arial, sans-serif',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2196F3';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
            }}
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#d32f2f';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#f44336';
              }
            }}
          >
            Clear
          </button>
          
          <button 
            type="submit"
            disabled={isSubmitting || !title.trim() || !description.trim()}
            style={{
              padding: '12px 24px',
              backgroundColor: isSubmitting || !title.trim() || !description.trim() ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting || !title.trim() || !description.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && title.trim() && description.trim()) {
                e.target.style.backgroundColor = '#45a049';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting && title.trim() && description.trim()) {
                e.target.style.backgroundColor = '#4CAF50';
              }
            }}
          >
            {isSubmitting ? 'Adding Recipe...' : 'Add Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;