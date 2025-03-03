import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, User } from "../types";

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

export const updateUser = async (formData: ProfileForm) => {
    try{
      const {data} = await api.patch<User>(`/profile`, formData)
      return data;
    }
    catch(error){
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
}

export const updateImage = async (file: File) => {
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