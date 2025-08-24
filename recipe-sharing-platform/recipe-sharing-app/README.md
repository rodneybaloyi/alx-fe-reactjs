# Recipe Sharing App 🍳

A modern React application for sharing and discovering recipes with advanced search, favorites, and personalized recommendation features.

## ✨ Features

### Core Recipe Management
- Recipe CRUD: Add, edit, delete, and view detailed recipes
- Advanced Search: Real-time search functionality across recipe titles and descriptions
- Dynamic Filtering: Interactive filtering of recipes based on search terms
- Modern UI: Clean, responsive design with hover effects and animations

### 🆕 New Features (Part 3)
- Favorites System: Save and manage your favorite recipes
- Personalized Recommendations: AI-powered recipe suggestions based on your favorites
- Smart Recommendation Engine: Analyzes your preferences to suggest similar recipes
- Interactive UI: Beautiful cards, animations, and user feedback
- Statistics Dashboard: Track your favorites and recommendation insights

### User Experience
- Navigation: React Router for seamless page transitions
- State Management: Zustand for efficient state handling
- Responsive Design: Works perfectly on all device sizes
- User-Friendly: Confirmation dialogs, loading states, and helpful feedback
- Accessibility: Proper ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

- React 18 - Modern React with Hooks
- React Router - Client-side routing  
- Zustand - Lightweight state management
- Vite - Fast build tool and dev server
- JavaScript ES6+ - Modern JavaScript features
- CSS3 - Advanced styling with animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/alx-fe-reactjs.git
   cd alx-fe-reactjs/recipe-sharing-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
recipe-sharing-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── RecipeList.jsx
│   │   ├── AddRecipeForm.jsx
│   │   ├── EditRecipeForm.jsx
│   │   ├── DeleteRecipeButton.jsx
│   │   ├── RecipeDetails.jsx
│   │   ├── FavoritesList.jsx (NEW)
│   │   ├── RecommendationsList.jsx (NEW)
│   │   └── FavoriteButton.jsx (NEW)
│   ├── recipeStore.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔍 How to Use

### Managing Recipes
1. Browse Recipes: View all recipes on the home page
2. Search: Use the search bar to find specific recipes
3. Add Recipe: Click "Add Recipe" to share your own
4. View Details: Click any recipe title to see full details
5. Edit/Delete: Use the buttons on recipe detail pages

### 🆕 Favorites System
1. Add to Favorites: Click the heart button (🤍) on any recipe
2. Remove from Favorites: Click the filled heart (💖) to unfavorite
3. View Favorites: Navigate to the "❤️ Favorites" page
4. Manage Collection: Easily remove items from your favorites list

### 🌟 Personalized Recommendations
1. Get Recommendations: Visit the "🌟 Recommendations" page
2. Smart Suggestions: System analyzes your favorites to suggest similar recipes
3. Interactive Actions: Add recommendations directly to favorites
4. Refresh Anytime: Update recommendations with new suggestions
5. Track Stats: View insights about your recipe preferences

### Advanced Features
- Real-time Updates: Favorites and recommendations update instantly
- Smart Matching: Recommendation engine uses keyword analysis
- Progress Tracking: Visual indicators show your recipe journey
- Cross-Navigation: Seamless movement between all app sections

## 🎨 Key Components

### Core Components
- SearchBar: Real-time search with clear functionality
- RecipeList: Dynamic recipe display with filtering
- Recipe Management: Add, edit, delete with validation

### 🆕 New Components
- FavoritesList: Beautiful grid layout of saved recipes
- RecommendationsList: AI-powered suggestions with match scores
- FavoriteButton: Interactive heart button with animations
- Enhanced Navigation: Badge counts and active states

## 🧠 Recommendation System

Our advanced recommendation engine:

1. Analyzes Your Favorites: Extracts keywords and patterns
2. Scores Similarities: Matches recipes based on content analysis
3. Provides Variety: Ensures diverse suggestions
4. Updates Dynamically: Improves with more favorites
5. Shows Transparency: Explains why recipes are recommended

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📋 Features Checklist

### Core Features
- [x] Recipe CRUD operations
- [x] Advanced search and filtering
- [x] Real-time search results
- [x] Modern UI with animations
- [x] Responsive design
- [x] State management with Zustand
- [x] Form validation and user feedback
- [x] Navigation with React Router

### 🆕 Part 3 Features  
- [x] Favorites system with persistent storage
- [x] Interactive favorite buttons with animations
- [x] Personalized recommendation engine
- [x] Smart content analysis for recommendations
- [x] Beautiful favorites and recommendations pages
- [x] Statistics and insights dashboard
- [x] Enhanced navigation with badge counts
- [x] Cross-component integration
- [x] Real-time updates across all features

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of the ALX Frontend Engineering program.

## 👨‍💻 Author

Built as part of the ALX React.js course assessment - Part 3 focusing on user experience enhancement through favorites and personalized recommendations.

## 🙏 Acknowledgments

- ALX Africa for the comprehensive learning program
- React community for excellent documentation and ecosystem
- Zustand team for the lightweight state management solution
- Open source community for inspiration and best practices

## 🔄 Version History

- v3.0 - Added favorites system and personalized recommendations
- v2.0 - Implemented advanced search and filtering capabilities  
- v1.0 - Basic recipe CRUD operations and navigation

---

Made with ❤️ for the ALX Frontend Engineering Program 🌟