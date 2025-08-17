import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import { useRecipeStore } from './recipeStore';

// Navigation component to show active states
const Navigation = () => {
  const location = useLocation();
  const favorites = useRecipeStore(state => state.favorites);
  const recommendations = useRecipeStore(state => state.recommendations);
  
  const navLinkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? 'white' : '#2196F3',
    backgroundColor: location.pathname === path ? '#2196F3' : 'transparent',
    padding: '10px 20px',
    border: '2px solid #2196F3',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  });

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
      <Link 
        to="/"
        style={navLinkStyle('/')}
        onMouseEnter={(e) => {
          if (location.pathname !== '/') {
            e.target.style.backgroundColor = '#2196F3';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== '/') {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#2196F3';
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        🏠 Home
      </Link>
      
      <Link 
        to="/add"
        style={navLinkStyle('/add')}
        onMouseEnter={(e) => {
          if (location.pathname !== '/add') {
            e.target.style.backgroundColor = '#2196F3';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== '/add') {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#2196F3';
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        ➕ Add Recipe
      </Link>

      <Link 
        to="/favorites"
        style={{
          ...navLinkStyle('/favorites'),
          color: location.pathname === '/favorites' ? 'white' : '#e91e63',
          borderColor: '#e91e63',
          backgroundColor: location.pathname === '/favorites' ? '#e91e63' : 'transparent'
        }}
        onMouseEnter={(e) => {
          if (location.pathname !== '/favorites') {
            e.target.style.backgroundColor = '#e91e63';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== '/favorites') {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#e91e63';
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        ❤️ Favorites
        {favorites.length > 0 && (
          <span style={{
            backgroundColor: 'white',
            color: location.pathname === '/favorites' ? '#e91e63' : 'white',
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '10px',
            marginLeft: '5px',
            fontWeight: 'bold'
          }}>
            {favorites.length}
          </span>
        )}
      </Link>

      <Link 
        to="/recommendations"
        style={{
          ...navLinkStyle('/recommendations'),
          color: location.pathname === '/recommendations' ? 'white' : '#9c27b0',
          borderColor: '#9c27b0',
          backgroundColor: location.pathname === '/recommendations' ? '#9c27b0' : 'transparent'
        }}
        onMouseEnter={(e) => {
          if (location.pathname !== '/recommendations') {
            e.target.style.backgroundColor = '#9c27b0';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (location.pathname !== '/recommendations') {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#9c27b0';
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        🌟 Recommendations
        {recommendations.length > 0 && (
          <span style={{
            backgroundColor: 'white',
            color: location.pathname === '/recommendations' ? '#9c27b0' : 'white',
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '10px',
            marginLeft: '5px',
            fontWeight: 'bold'
          }}>
            {recommendations.length}
          </span>
        )}
      </Link>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}>
        <header style={{ 
          marginBottom: '40px',
          textAlign: 'center',
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '36px',
            fontWeight: 'bold',
            margin: '0 0 10px 0'
          }}>
            🍳 Recipe Sharing App
          </div>
          <p style={{
            color: '#666',
            fontSize: '16px',
            margin: '0 0 30px 0'
          }}>
            Discover, favorite, and get personalized recipe recommendations
          </p>
          <Navigation />
        </header>

        <main style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          minHeight: '500px'
        }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <div style={{ 
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    <h2 style={{ 
                      fontSize: '28px', 
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
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                  }}>
                    <h2 style={{ 
                      fontSize: '28px', 
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      Share Your Recipe
                    </h2>
                    <p style={{
                      color: '#666',
                      fontSize: '16px',
                      margin: '0'
                    }}>
                      Add a new recipe to share with the community
                    </p>
                  </div>
                  <AddRecipeForm />
                </div>
              } 
            />

            <Route 
              path="/favorites" 
              element={
                <div>
                  <FavoritesList />
                </div>
              } 
            />

            <Route 
              path="/recommendations" 
              element={
                <div>
                  <RecommendationsList />
                </div>
              } 
            />
            
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>

        <footer style={{ 
          marginTop: '40px', 
          textAlign: 'center',
          padding: '25px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <h4 style={{ color: '#2196F3', margin: '0 0 10px 0' }}>🏠 Browse</h4>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                Explore all available recipes
              </p>
            </div>
            <div>
              <h4 style={{ color: '#e91e63', margin: '0 0 10px 0' }}>❤️ Favorites</h4>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                Save recipes you love
              </p>
            </div>
            <div>
              <h4 style={{ color: '#9c27b0', margin: '0 0 10px 0' }}>🌟 Recommendations</h4>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                Get personalized suggestions
              </p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #eee',
            paddingTop: '20px',
            color: '#666',
            fontSize: '14px'
          }}>
            <p style={{ margin: '0' }}>
              &copy; 2024 Recipe Sharing App - Share your culinary adventures with the world! 🌟
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;