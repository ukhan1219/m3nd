// App.tsx
// DO NOT CHANGE
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './App.css'
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import { JournalPage } from "./pages/JournalPage";
import { AnalyzePage } from "./pages/AnalyzePage";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      

        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>

            <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <JournalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analyze"
            element={
              <ProtectedRoute>
                <AnalyzePage />
              </ProtectedRoute>
            }
          />
          </Routes>
        </Router>

      <Footer />
    </div>
  )
}

export default App;