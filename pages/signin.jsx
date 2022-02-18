import React, { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../actions/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
const APP_NAME = process.env.APP_NAME

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <div className='w-full relative flex justify-center items-center py-12'>
                <div className="container h-96 w-96 glass-item">
                    <form className='h-full flex flex-col justify-evenly items-center' onSubmit={handleSubmit} > 
                        <div className='text-white font-poppins text-2xl tracking-widest'>Login form</div>
                        <label className="text-white font-poppins text-1xl tracking-widest" name="username">
                            Email ID
                        </label>
                        <input type="text" name="email" id="email" placeholder='Email Address' className='input-text' value={email} onChange={e => setEmail(e.target.value)} />
                        <label className="text-white font-poppins text-1xl tracking-widest" name="password">
                            Password
                        </label>
                        <input type="password" id="password"  placeholder='Password' className='input-text' value={password} onChange={e => setPassword(e.target.value)} />
                        <div className='flex space-x-9'>
                            <input type="Submit" className='cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 '/>
                            <Link href="/signup">
                                <span className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">SignUp?</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className='page-banner-container'>
                <div className="page-banner">
                    {APP_NAME} - SignIn
                </div>
                {showError()}
                {showLoading()}
                {showMessage()}
                {showForm && signinForm()}
            </div>
        </>
    );
};

export default SignIn;