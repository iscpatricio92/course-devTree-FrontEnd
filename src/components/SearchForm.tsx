import { useForm } from "react-hook-form"
import ErrorMessage from "./ErrorMessage"
import slugify from "react-slugify"
import { useMutation } from "@tanstack/react-query"
import { searchByHandle } from "../api/DevTreeApi"
import { Link } from "react-router-dom"

const SearchForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle,
    })
    const handle = watch('handle')
    const handleSearch=()=>{
        const slug= slugify(handle)
        console.log(slug);
        mutation.mutate(slug)
    }

    console.log(mutation.data);
    
    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2">
                <label
                    htmlFor="handle"
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                    placeholder="elonmusk, zuck, jeffbezos"
                    {...register("handle", {
                        required: "Un Nombre de Usuario es obligatorio",
                    })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-10">
                {mutation.isPending && <div className="text-center font-black">Searching...</div>}
                {mutation.isError && <div className="text-center text-red-600 font-black">{mutation.error.message}</div>}
                {mutation.isSuccess && <div className="text-center text-cyan-500">
                    {mutation.data.message} go to <Link to={`/auth/sign-up`} state={{handle:slugify(handle)}}> Sign Up</Link>
                </div>}
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Obtener mi DevTree'
            />
        </form>
    )
}

export default SearchForm