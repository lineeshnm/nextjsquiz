import React from 'react'
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth';
// import SideMenu from './SideMenu';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const APP_NAME = process.env.APP_NAME

const Toolbar = ({drawerToggleClickHandler, sideDrawerOpen}) => {
    const router = useRouter();
    return (
        <div className='fixed lg:left-12 lg:right-12 md:left-6 md:right-6 sm:left-2 sm:right-2 lg:top-6 md:top-4 sm:top-2 glass-item'>
            <div className="flex justify-between w-full lg:p-8 md:p-6 sm:p-2">
                <div className="md:float-left block toolbar_logo">
                    <Link href="/">
                        <a className="app-name">{APP_NAME}</a>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents toolbar_navigation-items">
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
                        <div className="md:float-right block toolbar_navigation-items">
                            <Link href="/signup">
                                <a className="header-item">SignUp</a>
                            </Link>
                            <Link href="/signin">
                                <a className="header-item">SignIn</a>
                            </Link>

                        </div>
                    )
                }
                {
                    isAuth() && (
                        <div className="md:float-right block toolbar_navigation-items">
                            <Link href="/">
                                <a 
                                    className="header-item" 
                                    onClick={() => signout(() => router.push(`/`))}
                                >Sign Out</a>
                            </Link>
                        </div>
                    )
                }
                <div className='toggle-btn' onClick={drawerToggleClickHandler}>
                    {
                        sideDrawerOpen ? (<CloseIcon  OnClick={drawerToggleClickHandler} />): (<MenuIcon OnClick={drawerToggleClickHandler} />)
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Toolbar