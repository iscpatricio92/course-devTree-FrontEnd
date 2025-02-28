import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeApi";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const  {data, error, isLoading} =  useQuery({
        queryFn:getUser,
        queryKey:['profile'],
        retry: 2,
        refetchOnWindowFocus: false
    })

    if(isLoading) return <div>Loading...</div>
    if(error) return <Navigate to="/auth/sign-in" />
    if(data) return <DevTree data={data}/>
}