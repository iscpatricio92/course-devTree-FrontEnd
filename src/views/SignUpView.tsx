import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import ErrorMessage from "../components/ErrorMessage";
import { SignUpForm } from "../types";
import axios, {isAxiosError} from "axios";
import { toast } from "sonner";
import api from "../config/axios";

const SignUpView = () => {
  const initialValues ={
    name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: ''
  }
  const { register, watch, handleSubmit, reset, formState:{errors} } = useForm<SignUpForm>({ defaultValues: initialValues });
  
  
  const password = watch('password');
  console.log(import.meta.env);
  
  
  const handleRegister = async(formData: SignUpForm) => {
    try{
      const {data} = await api.post(`/auth/sign-up`,formData)
      console.log(data);
      toast.success(data.message);
      reset()
    }
    catch(error){
      if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message);
        console.log(error.response.data.error);
      }
    }
  }


  return (
    <>
    <h1 className="text-4xl text-white font-bold">Sign Up</h1>
    <form
    onSubmit={handleSubmit(handleRegister)}
    className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
    >
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
        <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
    </div>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
        <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail is not valid",
              },
            })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
    </div>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
        <input
            id="handle"
            type="text"
            placeholder="Username without spaces"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('handle', { required: 'Handle is required' })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
    </div>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
        <input
            id="password"
            type="password"
            placeholder="Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password', { 
              required: 'Password is required',
              minLength:{value:8, message: 'Password must have at least 8 characters'}

            })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
    </div>

    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
        <input
            id="password"
            type="password"
            placeholder="Confirm Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation', { 
              required: 'Password is required',
              validate: value => value === password || 'The passwords do not match'
            })}
        />
        {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
    </div>

    <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Create Account'
    />  
</form>
    <nav className="mt-10">
      <Link className="text-center text-white text-lg block" to="/auth/sign-in">Sign In</Link>
    </nav>
    </>
  )
}

export default SignUpView