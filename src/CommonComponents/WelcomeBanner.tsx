import { useState } from 'react'

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className='text-white py-1.5 px-4 lg:px-6 flex justify-between items-center relative bg-gradient-to-r from-blue-600 to-purple-600'>
      <div className='flex-1 text-center'>
        <p className='text-[12px] font-medium'>
          Welcome to KPMG's Community Admin. Manage communities, oversee members, and watch collaboration flourish!
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className='ml-3 text-white hover:text-gray-200 transition-colors'
        aria-label="Close banner"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default WelcomeBanner
