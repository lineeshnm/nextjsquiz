import React from 'react'
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth';
import { useRouter } from 'next/router';

const navMenuItems = ['ToRenew', 'NotToRenew', 'Renewed']

const Header = () => {
    const router = useRouter();
    return (
        <div className="flex-grow px-12 lg:flex-row overflow-hidden max-w-[95%]  m-12 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
            <div className="flex justify-between border-b w-full border-blue-400 py-8 ">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white drop-shadow-2xl">Certificate Portal</span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                <Link key='dashboard' href={`/`}>
                    <span className="header-item">
                        Dashboard
                    </span>
                </Link>
                {navMenuItems.map((NavMenu, index) => (
                    <Link key={index} href={`/${NavMenu.toLowerCase()}`}><span className="header-item">{NavMenu}</span></Link>
                ))}
                <Link key='review' href={`/bulk`}>
                    <span className="header-item">
                        Bulk Update
                    </span>
                </Link>
                { isAuth() && (
                    <>
                        <Link key='modify' href={`/modify`}>
                            <span className="header-item">
                                DB Modify
                            </span>
                        </Link>
                        <Link key='uploadtoDB' href={`/uploadtodb`}>
                            <span className="header-item">
                                UploadtoDB
                            </span>
                        </Link>
                    </>
                )}
                </div>
                {
                    !isAuth() && (
                        <div className="md:float-right block">
                            <Link href="/signin">
                                <span className="header-item text-2xl">Sign In</span>
                            </Link>
                        </div>
                    )
                }
                {
                    isAuth() && (
                        <div className="md:float-right block">
                            <Link href="/">
                                <span 
                                    className="header-item text-2xl" 
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
