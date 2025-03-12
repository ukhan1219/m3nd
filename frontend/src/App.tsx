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

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavigationBar />

        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            {/* <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </Router>

      <Footer />
    </div>
  )
}

export default App;