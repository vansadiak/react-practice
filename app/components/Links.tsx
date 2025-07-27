import { Link, useLocation } from "react-router"

export const Links = ({url, children}: {url:string, children: React.ReactNode}) => {
    const location = useLocation();
    const isActive = location.pathname === url; 
    return (
      <Link to={url} className={`text-2xl shadow-xs hover:text-blue-500 hover:border-blue-500 hover:opacity-100 opacity-50 transition-all duration-300 rounded-md p-2 ${isActive ? 'text-blue-500 opacity-100' : ''}`}>
        {children}
      </Link>
    )
  }