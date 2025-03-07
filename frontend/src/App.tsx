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

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavigationBar />

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

      <Footer />
    </div>
  )
}

export default App;