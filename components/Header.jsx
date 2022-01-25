import React from 'react'
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth';
import { useRouter } from 'next/router';

const navMenuItems = ['ToRenew', 'NotToRenew', 'Renewed']

const Header = () => {
    const router = useRouter();
    return (
        <div className="flex-grow px-12 lg:flex-row bg-white bg-opacity-10 rounded-3xl overflow-hidden max-w-[95%] shadow-lg m-12 backdrop-blur-md">
            <div className="flex justify-between border-b w-full border-blue-400 py-8 ">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">Certificate Portal</span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                <Link key='dashboard' href={`/`}>
                    <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                        Dashboard
                    </span>
                </Link>
                {navMenuItems.map((NavMenu, index) => (
                    <Link key={index} href={`/${NavMenu.toLowerCase()}`}><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{NavMenu}</span></Link>
                ))}
                { isAuth() && (
                    <>
                        <Link key='review' href={`/review`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                Review
                            </span>
                        </Link>
                        <Link key='upload' href={`/uploadtodb`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                UploadtoDB
                            </span>
                        </Link>
                    </>
                )}
                </div>
                {
                    !isAuth() && (
                        <>
                            <div className="md:float-right block">
                                <Link href="/signin">
                                    <span className="cursor-pointer font-bold text-2xl text-white">Login</span>
                                </Link>
                            </div>
                            <div className="md:float-right block">
                                <Link href="/signup">
                                    <span className="cursor-pointer font-bold text-2xl text-white">SignUp</span>
                                </Link>
                            </div>
                        </>
                    )
                }
                {
                    isAuth() && (
                        <div className="md:float-right block">
                            <Link href="/">
                                <span 
                                    className="cursor-pointer font-bold text-2xl text-white" 
                                    onClick={() => signout(() => router.push(`/`))}
                                >Logout</span>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header
