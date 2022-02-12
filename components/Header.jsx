import React from 'react'
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth';
import { useRouter } from 'next/router';
const APP_NAME = process.env.APP_NAME

const Header = () => {
    const router = useRouter();
    return (
        <div className='fixed left-12 right-12 top-5 bg-white bg-opacity-10 rounded-2xl shadow-5xl z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm'>
            <div className="flex justify-between w-full py-8 px-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <a className="cursor-pointer font-bold text-4xl text-white drop-shadow-2xl">{APP_NAME}</a>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    <Link key='dashboard' href={`/`}>
                        <a className="header-item">
                            Home
                        </a>
                    </Link>
                    <Link key='quizes' href={`/quizes`}>
                        <a className="header-item">
                            Quizes
                        </a>
                    </Link>
                    { isAuth() && (
                    <>  
                        <Link key='createquiz' href={`/createquiz`}>
                            <a className="header-item">
                                Build a Quiz
                            </a>
                        </Link>
                        <Link key='uploadtoDB' href={`/uploadtodb`}>
                            <a className="header-item">
                                UploadtoDB
                            </a>
                        </Link>
                    </>
                    )}
                </div>
                {
                    !isAuth() && (
                        <div className="md:float-right block">
                            <Link href="/signup">
                                <a className="header-item text-2xl">SignUp</a>
                            </Link>
                            <Link href="/signin">
                                <a className="header-item text-2xl">SignIn</a>
                            </Link>

                        </div>
                    )
                }
                {
                    isAuth() && (
                        <div className="md:float-right block">
                            <Link href="/">
                                <a 
                                    className="header-item text-2xl" 
                                    onClick={() => signout(() => router.push(`/`))}
                                >Sign Out</a>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header
