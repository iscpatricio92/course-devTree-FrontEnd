import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { User, UserHandle } from "../types";
import { getUserByHandle } from "../api/DevTreeApi";
import HandleData from "../components/HandleData";

const HandleView = () => {
    const params = useParams();
    const handle = params.handle!
    
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey:['handle', handle],
        retry:2
     })
    if(isLoading)return <p className="text-center text-white">Loading...</p>
    if(isError)return <Navigate to={"/404"}/>

  if (data)return (<HandleData data={data} />)
}

export default HandleView