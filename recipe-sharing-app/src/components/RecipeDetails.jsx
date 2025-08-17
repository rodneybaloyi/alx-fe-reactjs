import { useRecipeStore } from '../recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === parseInt(id))
  );
  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#f44336', marginBottom: '20px' }}>Recipe Not Found</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          The recipe you're looking for doesn't exist or may have been deleted.
        </p>
        <Link 
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#2196F3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1976D2';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#2196F3';
          }}
        >
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <Link 
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#2196F3',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.target.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.target.style.textDecoration = 'none';
          }}
        >
          ← Back to All Recipes
        </Link>
      </div>

      {/* Recipe Details Card */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Recipe Header */}
        <div style={{
          padding: '30px',
          borderBottom: '1px solid #eee'
        }}>
          <h1 style={{
            fontSize: '32px',
            color: '#333',
            margin: '0 0 15px 0',
            lineHeight: '1.2'
          }}>
            {recipe.title}
          </h1>
          
          {recipe.createdAt && (
            <p style={{
              color: '#666',
              fontSize: '14px',
              margin: '0',
              fontStyle: 'italic'
            }}>
              Created on {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>

        {/* Recipe Description */}
        <div style={{ padding: '30px' }}>
          <h3 style={{
            fontSize: '20px',
            color: '#333',
            margin: '0 0 15px 0'
          }}>
            Description
          </h3>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '4px',
            borderLeft: '4px solid #2196F3'
          }}>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#555',
              margin: '0',
              whiteSpace: 'pre-wrap'
            }}>
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          padding: '30px',
          borderTop: '1px solid #eee',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              padding: '12px 24px',
              backgroundColor: isEditing ? '#ff9800' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isEditing ? '#f57c00' : '#1976D2';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isEditing ? '#ff9800' : '#2196F3';
            }}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Recipe'}
          </button>
          
          <DeleteRecipeButton id={recipe.id} />
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div style={{ marginTop: '30px' }}>
          <EditRecipeForm 
            recipe={recipe} 
            onSave={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;