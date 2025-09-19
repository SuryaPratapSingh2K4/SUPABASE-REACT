import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignUp = async () => {
        // e.preventDefault();
        // const {data,error} = await supabase.auth.signUp({email,password})
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("SignUp Error:", error);
            alert("SignUp failed: " + error.message);
            return;
        } else {
            console.log(data.user);
            alert("SignUp successful! Please check your email to confirm your account.");
            navigate('/');
        }
    }
    return (
        <form onSubmit={handleSignUp} className='flex flex-col justify-center items-center h-screen'>
            <div className='flex flex-col p-20 border rounded-lg space-y-4 '>
                <h1 className='text-3xl font-bold mb-4'>User Sign Up</h1>
                <input type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border rounded-lg border-gray-400 py-2 mb-4 p-4'
                />
                <input type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border rounded-lg border-gray-400 py-2 mb-4 p-4'
                />
                <div className='flex space-x-4'>
                    <button type='submit' className='border border-blue-500 text-black hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg'>Sign Up</button>
                    <button type='button' onClick={() => {
                        navigate('/')
                    }} className='border border-green-500 text-black hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg'>Sign In</button>

                </div>
            </div>

        </form>
    )
}

export default SignUp
