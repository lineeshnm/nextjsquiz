import React from 'react'
import Link from 'next/link'

const navMenuItems = ['Certificate', 'ToRenew', 'NotToRenew','UpdateDataBase']

const Header = () => {
    return (
        <div className="flex-grow px-12 lg:flex-row bg-white bg-opacity-10 rounded-3xl overflow-hidden max-w-[95%] shadow-lg m-12"
        style={{
        backdropFilter: 'blur(10px)',
        }}>
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                <Link href="/">
                    <span className="cursor-pointer font-bold text-4xl text-white">Certificate Portal</span>
                </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                {navMenuItems.map((NavMenu, index) => (
                    <Link key={index} href={`/${NavMenu.toLowerCase()}`}><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{NavMenu}</span></Link>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Header
