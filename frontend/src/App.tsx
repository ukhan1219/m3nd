// DO NOT CHANGE
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './App.css'
import NavigationBar from "./components/NavigationBar";
import AboutPage from "./pages/AboutPage"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage";
import FAQaccordion from "./components/FAQaccordion"
import Carousel from "./components/Carousel"
import Footer from "./components/Footer"
import CrewCard from "./components/CrewCard"
import LogInForm from "./components/LogInForm"
import SignUpForm from "./components/SignUpForm"
import JournalEntry from "./components/JournalEntry"

function App() {
  return (
    <>
      
      <JournalEntry isNewEntry={true}/>
      <JournalEntry isNewEntry={false}/>
      
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/about" element={<AboutPage/>}/>
          {/* <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
