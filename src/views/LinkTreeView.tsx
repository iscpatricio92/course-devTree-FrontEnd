import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/DevTreeApi"
import { User } from "../types"

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user:User= queryClient.getQueryData(['profile'])!
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Links updated')
    }
  })

  useEffect(()=>{
    const updatedData = devTreeLinks.map(item => {
      const userLink = JSON.parse(user.links).find((link:any)=> link.name === item.name)
      if(userLink){
        return {...item, url: userLink.url, enabled: userLink.enabled}
      }
      return item
    })
    setDevTreeLinks(updatedData)
  },[])

  const handleUrlChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? {...link, url: e.target.value} : link)
    setDevTreeLinks(updatedLinks)
    queryClient.setQueryData(['profile'], (prevData:User)=>{
      return {...prevData, links: JSON.stringify(updatedLinks)}
    })
  }

  const handleEnableLink =(socialNetwork:string)=>{
    const updatedLinks = devTreeLinks.map(link => {
      if(link.name === socialNetwork){
        if(isValidUrl(link.url))
          return {...link, enabled: !link.enabled}
        else{
          toast.error('Invalid URL')
          return link
        }
      }else{
        return link
      }
    })
    setDevTreeLinks(updatedLinks)
    queryClient.setQueryData(['profile'], (prevData:User)=>{
      return {...prevData, links: JSON.stringify(updatedLinks)}
    })
  }

  return (
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
            />
        ))}
        <button 
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={()=>mutate(user)}
          >Save changes</button>
      </div>
  )
}

export default LinkTreeView