import React from "react";
import { useState } from "react";
import { FormEvent } from "react";

const signUpForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [googleSignUp, setGoogleSignUp] = useState("");
    const [agreed, setAgreed] = useState(false);

    const label = "block mb-1 font-medium text-left text-[#3B4E6D]";
    const input = "w-full p-2 mb-4 border rounded-md bg-white text-[#3B4E6D] text-center border-[#3B4E6D]";

    {/* TEMPORARY */}
    const handleSignUp = (e: FormEvent) => {
        e.preventDefault();
        console.log("First Name: ", firstName, "Last Name: ", lastName, "Email: ", email, "Password: ", password, "Agreed: ", agreed);
    };

    return(
        <div className="flex justify-center items-center">
            <div className="bg-[#B6BDE7] p-8 rounded-2xl outline-black shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4 text-black">Sign Up</h2>

                {/* GOOGLE SIGN UP */}
                <input
                    type="text"
                    value={googleSignUp}
                    onChange={(e) => setGoogleSignUp(e.target.value)}
                    placeholder="Sign up with Google"
                    className={`${input} text-center cursor-pointer`}
                    readOnly
                />

                <span className="text-[#3B4E6D]"> ━━━━━━━━━━━━━━━━━━━━ </span>

                <form onSubmit={handleSignUp}>
                    {/* FULL NAME */}
                    <label className={label}> Full Name </label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className={input}
                            required
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className={input}
                            required
                        />
                    </div>

                    {/* EMAIL */}
                    <label className={label}> Email </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className={input}
                        required
                    />

                    {/* PASSWORD */}
                    <label className={label}> Password </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={input}
                        required
                    />

                    {/* TERMS AND CONDITIONS
                            - need to fix text centering
                            - need to fix checkbox so that it is transparent
                    */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                            className="mr-2"
                            required
                        />
                        <span className="text-[#3B4E6D] text-center"> I agree to the <a href="#" className="underline">Terms & Conditions</a></span>
                    </div>

                    {/* REGISTER BUTTON */}
                    <button
                        type="submit"
                        className="w-1/2 p-2 my-3 bg-[#3B4E6D] text-white rounded-3xl hover:bg-blue-700">
                            Register
                    </button>
                </form>

                <span className="text-[#3B4E6D]"> ━━━━━━━━━━━━━━━━━━━━ </span>

                {/* LOG IN LINK */}
                <p className="text-center mt-4">
                    <p className="text-[#3B4E6D] text-sm font-bold"> Already Have an Account? </p>
                    <a href="#" className="text-[#3B4E6D] text-sm underline font-bold"> Log In </a>
                </p>
            </div>
        </div>
    );
};

export default signUpForm;