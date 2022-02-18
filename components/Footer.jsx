import React from 'react'

const Footer = () => {
    return (
        <footer className="footer-container">
          <div className='footer'>
            <a
              className="footer-a"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
            </a>
            <p className='footer-p'>All rights Reserved @Lineesh</p>
          </div>
        </footer>
    )
}

export default Footer
