import React from "react";
import { useState } from "react";
import { FormEvent } from "react";

const logInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [googleLogin, setGoogleLogin] = useState("");

    const label = "block mb-1 font-medium text-left text-[#3B4E6D]";
    const input = "w-full p-2 mb-4 border rounded-md bg-white text-[#3B4E6D] text-center border-[#3B4E6D]";

    {/* TEMPORARY */}
    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        console.log("Email: ", email, "Password: ", password);
    };

    return(
        <div className="flex justify-center items-center">
            <div className="bg-[#B6BDE7] p-8 rounded-2xl outline-black shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4 text-black">Log In</h2>

                {/* GOOGLE LOGIN */}
                <input
                    type="text"
                    value={googleLogin}
                    onChange={(e) => setGoogleLogin(e.target.value)}
                    placeholder="Log in with Google"
                    className={`${input} text-center cursor-pointer`}
                    readOnly
                />

                <span> ━━━━━━━━━━━━━━━━━━━━ </span>

                <form onSubmit={handleLogin}>
                    {/* EMAIL */}
                    <label className={label}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className={input}
                        required
                    />

                    {/* PASSWORD */}
                    <label className={label}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={input}
                        required
                    />

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="w-1/2 p-2 my-6 bg-[#3B4E6D] text-white rounded-3xl hover:bg-blue-700">
                            Log in
                    </button>
                </form>

                <span> ━━━━━━━━━━━━━━━━━━━━ </span>

                {/* SIGN UP LINK*/}
                <p className="text-center mt-4">
                    <p className="text-[#3B4E6D] text-sm font-bold"> Don't Have an Account? </p>
                    <a href="#" className="text-[#3B4E6D] text-sm underline font-bold"> Sign Up </a>
                </p>
            </div>
        </div>
    );
};

export default logInForm;