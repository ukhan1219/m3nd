const Signup = () => {
  return (
    <div className="flex flex-col items-center w-full bg-lightlavender min-h-screen pt-32">
      <p className="font-Kanit flex text-darkblue text-4xl pb-1 font-bold">Ready to mend?</p>
      <p className="font-Sora flex text-darkblue text-md font-light">Create a free account today!</p>

      <div className=" p-8 rounded-3xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-darkblue mb-4">Sign Up</h2>
        <button className="w-full bg-pearl text-darkblue font-semibold py-2 rounded-lg mb-4 shadow-md hover:bg-darkblue hover:text-pearl transition">
          Sign up with Google
        </button>
        
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <input type="text" placeholder="First Name" className="w-1/2 p-2 border rounded-lg" />
            <input type="text" placeholder="Last Name" className="w-1/2 p-2 border rounded-lg" />
          </div>
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded-lg" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="h-4 w-4" />
            <label htmlFor="terms" className="text-sm">I agree to the <a href="#" className="text-blue-600 font-semibold">Terms & Conditions</a></label>
          </div>
          <button className="w-full bg-darkblue text-pearl font-semibold py-2 rounded-lg shadow-md hover:bg-midblue transition">
            Register
          </button>
          <p className="text-sm text-center mt-2">Don't have an account? <a href="/login" className="text-blue-600 font-semibold">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
