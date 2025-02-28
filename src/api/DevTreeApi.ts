import { isAxiosError } from "axios";
import api from "../config/axios";
import { User } from "../types";

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