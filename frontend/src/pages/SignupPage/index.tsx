import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Google from './../../assets/web_neutral_rd_na.svg';

const Signup = () => {
  const navigate = useNavigate();

  // Form state for local signup
  const [firstName, setFirstName]   = useState("");
  const [lastName, setLastName]     = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/local/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  type PopupProps = {
    onConfirm: () => void;
  };
  function Popup({ onConfirm }: PopupProps) {
    
    return (
      <div className="fixed inset-0 bg-darkblue bg-opacity-50 flex items-center justify-center">
        <div className="bg-pearl p-10 rounded-xl shadow-lg w-96 h-52 text-center border-[3px] border-darkblue">
          <p className="text-darkblue font-Solway text-xl mb-2">There are no terms lol</p>
          <p className="text-midblue font-Sora text-sm mb-4 italic">We just wanted it to look real</p>
          <div className="flex justify-center">
            <button 
              className="bg-darkblue hover:bg-midblue  text-pearl px-8 py-1 rounded-full border-2 border-darkblue font-Dongle text-2xl transition-all duration-300"
              onClick={onConfirm}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-pearl h-auto min-h-[calc(100vh-10rem)] justify-center pt-28 sm:pt-32">
      <p className="font-Kanit text-darkblue text-4xl pb-1 font-bold">Ready to mend?</p>
      <p className="font-Sora text-darkblue text-md font-light">Create a free account today!</p>
      
      <div className="px-8 pt-8 pb-12 rounded-3xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-darkblue mb-4">Sign Up</h2>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-[#F2F2F2] text-darkblue font-semibold py-1.5 rounded-full border-2 mb-4 hover:shadow-lg transition flex items-center justify-center">
          <img src={Google} alt="Google" className="mr-2" />
          Sign up with Google
        </button>
        <div className="flex items-center space-x-2 text-darkblue">
          <div className="flex-grow border-b"></div>
          <span className="text-3xl font-Dongle font-medium">or</span>
          <div className="flex-grow border-b"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <p className="text-darkblue font-Dongle text-left text-3xl">Name</p>
          <div className="flex space-x-2 pb-2">
            <input 
              type="text" 
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 p-2 border-2  border-lightblue bg-lightlavender font-Sora rounded-xl text-darkblue" 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 p-2 border-2 border-lightblue bg-lightlavender font-Sora rounded-xl text-darkblue" 
            />
          </div>
          <div className="pb-2 text-left">
            <p className="text-darkblue font-Dongle text-3xl">Email</p>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-2 border-lightblue bg-lightlavender font-Sora rounded-xl text-darkblue" 
            />
          </div>
          <p className="text-darkblue font-Dongle text-left text-3xl">Password</p>
          <div className="relative w-full pb-2">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-lightblue bg-lightlavender font-Sora rounded-xl text-darkblue pr-16" 
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-[40%] transform -translate-y-1/2 text-darkblue text-sm font-semibold">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="pt-4 flex justify-center items-center space-x-2">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsChecked}
              onChange={() => setTermsChecked(!termsChecked)}
              className="h-4 w-4" 
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the <a href="#" onClick={handleTermsClick} className="text-blue-600 font-semibold underline">Terms &amp; Conditions</a>
            </label>
          </div>
          {error && <p className="text-[#A30000] font-dongle font-bold text-center mt-2">{error}</p>}
          <div className="flex justify-center pt-8 pb-2">
            <button 
              type="submit"
              disabled={!termsChecked}
              className={`w-48 font-semibold py-2.5 rounded-full shadow-md transition ${
                termsChecked 
                  ? "bg-midblue border-2 border-darkblue hover:bg-darkblue text-pearl"
                  : "bg-midblue border-2 border-darkblue text-pearl opacity-75 cursor-not-allowed"
              }`}>
              Register
            </button>
          </div>
          <p className="text-sm text-darkblue text-center mt-4">
            Already have an account? <a href="/login" className="text-blue-600 font-semibold underline">Log in</a>
          </p>
        </form>
      </div>

      {showPopup && <Popup onConfirm={closePopup} />}
    </div>
  );
};

export default Signup;
