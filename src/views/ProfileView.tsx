import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateUser, updateImage } from "../api/DevTreeApi";
import { toast } from "sonner";


export default function ProfileView() {
    const queryClient= useQueryClient();
    const data: User = queryClient.getQueryData(['profile'])!;

    const { register, handleSubmit, formState:{errors}} = useForm<ProfileForm>({defaultValues:{
        handle: data.handle,
        description: data.description,
        image: data.image
    }});

    const updateProfileMutation= useMutation({
        mutationFn: updateUser,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (res) => {
            toast.success(res?.message);
            queryClient.invalidateQueries({queryKey:['profile']});
        }
    });

    const uploadImageMutation= useMutation({
        mutationFn: updateImage,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (res) => {
            toast.success('Image uploaded');
            queryClient.setQueryData(['profile'], (prevData:User)=>{
                return {...prevData, image: res?.image}
        });
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            uploadImageMutation.mutate(e.target.files[0]);
        }
    }

    const handleUserProfileForm=(formData:ProfileForm)=>{
        const user = queryClient.getQueryData(['profile'])!
        user.description= formData.description;
        user.handle= formData.handle;
        updateProfileMutation.mutate(user);
    }
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {required: 'this field is required'})}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description')}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ handleChange}
                    
                />
                {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}