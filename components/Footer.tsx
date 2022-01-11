import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full h-24 border-t">
          <div className='flex justify-around mt-6'>
            <a
              className="flex justify-center"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
            </a>
            <p>All rights Reserved</p>
          </div>
        </footer>
    )
}

export default Footer
