import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface BreadcrumbItem {
  label: string
  path: string
  isActive?: boolean
}

const Breadcrumbs = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [communityName, setCommunityName] = useState<string | null>(null)

  // Extract community name from URL if present
  const getCommunityNameFromPath = () => {
    const match = location.pathname.match(/\/community\/([^\/]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }

  // Update community name when path changes
  useEffect(() => {
    const name = getCommunityNameFromPath()
    setCommunityName(name)
  }, [location.pathname])

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = []
    const currentCommunityName = getCommunityNameFromPath()

    // Add My Feed as first item
    breadcrumbs.push({
      label: 'My Feed',
      path: '/admin',
      isActive: location.pathname === '/admin'
    })

    // If we're on a community page, add the community name
    if (currentCommunityName) {
      breadcrumbs.push({
        label: currentCommunityName,
        path: `/community/${encodeURIComponent(currentCommunityName)}`,
        isActive: true
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  const handleBreadcrumbClick = (path: string, isActive: boolean) => {
    if (!isActive) {
      navigate(path)
    }
  }

  if (breadcrumbs.length <= 1) {
    return null // Don't show breadcrumbs if only one item
  }

  return (
    <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-4'>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className='flex items-center'>
          {index > 0 && (
            <svg 
              className='w-4 h-4 mx-2 text-gray-400' 
              fill='currentColor' 
              viewBox='0 0 20 20'
            >
              <path 
                fillRule='evenodd' 
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' 
                clipRule='evenodd' 
              />
            </svg>
          )}
          <button
            onClick={() => handleBreadcrumbClick(breadcrumb.path, breadcrumb.isActive || false)}
            className={`hover:text-blue-600 transition-colors ${
              breadcrumb.isActive 
                ? 'text-blue-600 font-medium cursor-default' 
                : 'text-gray-600 hover:underline cursor-pointer'
            }`}
            disabled={breadcrumb.isActive}
          >
            {breadcrumb.label}
          </button>
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumbs
