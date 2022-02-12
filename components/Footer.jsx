import React from 'react'

const Footer = () => {
    return (
        <footer className="fixed left-12 right-12 bottom-5 bg-white bg-opacity-10 rounded-2xl shadow-5xl z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
          <div className='flex justify-around mt-6 text-2xl text-white tracking-widest pb-6'>
            <a
              className="flex justify-center"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
            </a>
            <p>All rights Reserved @Lineesh</p>
          </div>
        </footer>
    )
}

export default Footer
