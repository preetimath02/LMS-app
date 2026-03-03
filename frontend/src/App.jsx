import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CourseList from './components/Course/CourseList';
import CourseDetail from './components/Course/CourseDetail';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route 
                path="/courses" 
                element={
                  <ProtectedRoute>
                    <CourseList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/courses/:id" 
                element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect root to courses or login */}
              <Route 
                path="/" 
                element={<Navigate to="/courses" replace />} 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
