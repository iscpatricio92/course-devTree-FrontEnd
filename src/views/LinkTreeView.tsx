import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/DevTreeApi"
import { SocialNetwork, User } from "../types"

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
    /* queryClient.setQueryData(['profile'], (prevData:User)=>{
      return {...prevData, links: JSON.stringify(updatedLinks)}
    }) */
  }

  const links:SocialNetwork[]= JSON.parse(user.links)
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

    let updatedItems:SocialNetwork[]=[]
    const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
    if(selectedSocialNetwork?.enabled){
      const id = links.filter(link => link.id).length +1;
      if(links.some(link => link.name === socialNetwork)){
        updatedItems= links.map(link=>{
          if(link.name === socialNetwork){
            return{
              ...link,
              enabled: true,
              id
            }
          }
          else{
            return link
          }
        })
      }
      else{
        const newItem={
        ...selectedSocialNetwork,
        id
      }
      updatedItems=[...links, newItem]
      }
    }else{
      const indexToUpdate=links.findIndex(link=>link.name === socialNetwork)
      updatedItems= links.map(link=>{
        if(link.name === socialNetwork){
          return {
            ...link,
            enabled: false,
            id:0
          }
        } else if(link.id > indexToUpdate){
          return{
            ...link,
            id: link.id-1
          }
        }
        else{
          return link
        }
      })
    }

    //save on DB
    queryClient.setQueryData(['profile'], (prevData:User)=>{
      return {...prevData, links: JSON.stringify(updatedItems)}
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