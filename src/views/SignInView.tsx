import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import api from "../config/axios"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { SignInForm } from "../types"

export const SignInView = () => {
  const initialValues :SignInForm= {
    email: '',
    password: ''
  }
  const navigate = useNavigate();

  const { register, handleSubmit, formState:{errors} } = useForm({ defaultValues: initialValues })
  const handleSignIn = async (formData: SignInForm) => {
    try{
      const {data} = await api.post(`/auth/sign-in`,formData)
      toast.success('Welcome back!');
      localStorage.setItem('devTree_access_token', data.access_token);
      navigate("/admin");
    }
    catch(error){
      if(isAxiosError(error) && error.response){
        toast.error(error.response.data.error);
        console.log(error.response.data.error);
      }
    }
  }

  return (
    <>
    <h1 className="text-4xl text-white font-bold">Sign In</h1>
    <form 
    onSubmit={handleSubmit(handleSignIn)}
    className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
    noValidate
>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
        <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                },
            })}
        />
        {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
    </div>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
        <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
                required: "El Password es obligatorio",
            })}
        />
        {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
    </div>

    <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Iniciar Sesión'
    />
</form>
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
