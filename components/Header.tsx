import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const navMenuItems = ['Certificate', 'ITSI', 'ExpiryDate']

const Header = () => {
    return (
        <>
        <Head>
            <title>App Hosting Certificate Portal</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto px-10 mb-8">
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
        </>
    )
}

export default Header
