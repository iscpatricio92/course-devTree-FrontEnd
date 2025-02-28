import { Link } from "react-router-dom"

export const SignInView = () => {
  return (
    <>
    <h1 className="text-4xl text-white font-bold">Sign In</h1>
    
    <nav className="mt-10">
      <Link 
        className="text-center text-white text-lg block" 
        to="/auth/sign-up">
        don't have an account yet? register here!
      </Link>
    </nav>
    </>
  )
}

export default SignInView
