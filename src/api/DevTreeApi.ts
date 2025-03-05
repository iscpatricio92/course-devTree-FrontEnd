import { isAxiosError } from "axios";
import api from "../config/axios";
import { User, UserHandle } from "../types";

export const getUser = async () => {
    try{
      const {data} = await api.get<User>(`/profile`)
      return data;
    }
    catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
}

export const updateProfile= async (formData: User) => {
    try {
        const { data } = await api.patch<string>('/profile', formData)
        return data;
    }
    catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const uploadImage = async (file: File) => {
  let formData = new FormData();
  formData.append('file', file);
    try{
      const {data} = await api.post<User>(`/user/image`, formData)
      return data;
    }
    catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
}

export const getUserByHandle = async (handle:string) => {
    try{
      const {data} = await api<UserHandle>(`/${handle}`)
      return data;
    }
    catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
}

export const searchByHandle = async (handle:string) => {
    try{
      const {data} = await api.post<any>('/search',{handle})
      return data;
    }
    catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
}