import { useState } from 'react';

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center w-full bg-pearl h-auto min-h-[calc(100vh-10rem)] sm:min-h-screen justify-center pt-28 sm:pt-32">
      <p className="font-Kanit flex text-darkblue text-4xl pb-1 font-bold md:text-4xl 2xl:md:text-5xl">Ready to mend?</p>
      <p className="font-Sora flex text-darkblue text-md font-light md:text-lg 2xl:text-xl">Start mending now!</p>

      <div className="px-8 pt-8 pb-12 rounded-3xl max-w-md w-full md:max-w-lg">
        <h2 className="text-3xl font-extrabold text-center text-darkblue mb-4 2xl:text-4xl">Log in</h2>
        <button className="w-full bg-pearl text-darkblue font-semibold py-2 rounded-xl border-2 mb-4 shadow-md hover:bg-darkblue hover:text-pearl transition md:py-3 md:text-lg">
          Log in with Google
        </button>
        <div className="flex items-center space-x-2 text-darkblue">
          <div className="flex-grow border-b"></div>
          <span className="text-3xl font-Dongle font-medium md:text-4xl">or</span>
          <div className="flex-grow border-b"></div>
        </div>

        <div className="flex flex-col ">
          <div className="pb-2">
            <p className="flex bottom-0 text-darkblue font-Dongle text-3xl md:text-4xl">Email</p>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-2 border-2 border-lightblue bg-lightlavender font-Sora rounded-xl text-darkblue md:p-3 md:text-lg" 
            />
          </div>
          
          <p className="flex text-darkblue font-Dongle text-3xl md:text-4xl">Password</p>
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full p-2 border-2 border-lightblue bg-lightlavender font-Sora rounded-xl text-darkblue pr-16 md:p-3 md:text-lg" 
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-darkblue text-sm font-semibold md:text-base"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          
          <div className="flex justify-center pt-8 pb-2">
            <button className="bg-midblue border-2 border-darkblue hover:bg-darkblue text-pearl w-48 font-semibold py-2.5 rounded-full shadow-md transition md:py-3 md:text-lg">
              Sign in
            </button>
          </div>
          <p className="text-sm text-darkblue text-center mt-2 md:text-base">
            Don't have an account? <a href="/signup" className="text-blue-600 font-semibold underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
