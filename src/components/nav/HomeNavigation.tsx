import { Link } from "react-router-dom"

const HomeNavigation = () => {

  return (
    <>
        <Link 
            to="/auth/sign-in" 
            className="text-white p-2 uppercase font-black text-xs cursor-pointer"
        >Sign In</Link>
        <Link 
            to="/auth/sign-up" 
            className="bg-lime-500 text-slate-800 p-2 uppercase font-black text-xs cursor-pointer rounded-lg"
        >Sign Up</Link>
    </>
  )
}

export default HomeNavigation