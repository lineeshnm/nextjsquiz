import React, { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../actions/auth';
import { useRouter } from 'next/router';
import Link from 'next/link'
const APP_NAME = process.env.APP_NAME

const SignIn = () => {
    const [email, setEmail] = useState('lineesh@gmail.com');
    const [password, setPassword] = useState('acbd1234');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(true);
    const router = useRouter();
    useEffect(() => {
        // console.log(isAuth())
        isAuth() && router.push("/");
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true)
        setShowForm(false)
        setError(false)
        const user = { email, password };

        signin(user).then(data => {
            // console.log(data)
            if (data.error) {
                setError("Authentication failed")
                setLoading(false)
                setShowForm(true)
                setMessage('')
            } else {
                setMessage('Signin Completed')
                setError('')
                setLoading(false)
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        router.push(`/`);
                    } else {
                        router.push(`/`);
                    }
                });
            }
        });
    };

    const showLoading = () => (loading ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">Loading...</div> : '');
    const showError = () => (error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div> : '');
    const showMessage = () => (message ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">{message}</div> : '');

    const signinForm = () => {
        return (
            <div className="flex justify-center w-full">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}> 
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" name="username">
                            Email ID
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="email" 
                            type="text" 
                            name="email"
                            placeholder="Email Address" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" name="password">
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password" 
                            type="password" 
                            placeholder="******************" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        </div>
                        <div className="flex items-center justify-between">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit"
                        >
                            Sign In
                        </button>
                        <Link href="/signup">
                            <span className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">SignUp?</span>
                        </Link>
                        </div>
                </form>
            </div>
        );
    };

    return (
        <div className='flex-grow px-12'>
            <div className="text-center text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{`${APP_NAME} - Signin`}</div>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </div>
    );
};

export default SignIn;