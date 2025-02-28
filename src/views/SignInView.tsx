import { Link } from "react-router-dom"

export const SignInView = () => {
  return (
    <>
    <nav>
      <Link to="/auth/sign-up">don't have an account yet? register here!</Link>
    </nav>
    </>
  )
}

export default SignInView
