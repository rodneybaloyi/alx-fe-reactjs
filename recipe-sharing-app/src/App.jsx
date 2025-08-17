import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <header style={{ 
          marginBottom: '30px',
          textAlign: 'center',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '20px'
        }}>
          <h1 style={{ 
            color: '#2196F3',
            fontSize: '32px',
            margin: '0 0 20px 0'
          }}>
            Recipe Sharing App
          </h1>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link 
              to="/"
              style={{
                textDecoration: 'none',
                color: '#2196F3',
                padding: '10px 20px',
                border: '1px solid #2196F3',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2196F3';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#2196F3';
              }}
            >
              Home
            </Link>
            <Link 
              to="/add"
              style={{
                textDecoration: 'none',
                color: '#4CAF50',
                padding: '10px 20px',
                border: '1px solid #4CAF50',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4CAF50';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#4CAF50';
              }}
            >
              Add Recipe
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ 
                      fontSize: '24px', 
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      Find Your Perfect Recipe
                    </h2>
                    <SearchBar />
                  </div>
                  <RecipeList />
                </div>
              } 
            />
            <Route 
              path="/add" 
              element={
                <div>
                  <h2 style={{ 
                    fontSize: '24px', 
                    marginBottom: '20px',
                    color: '#333'
                  }}>
                    Add New Recipe
                  </h2>
                  <AddRecipeForm />
                </div>
              } 
            />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>

        <footer style={{ 
          marginTop: '50px', 
          textAlign: 'center',
          padding: '20px',
          borderTop: '1px solid #eee',
          color: '#666',
          fontSize: '14px'
        }}>
          <p>&copy; 2024 Recipe Sharing App. Share your favorite recipes with the world!</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;