import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}

const HandleData = ({data}:HandleDataProps) => {
  const links :SocialNetwork[]= JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled);
  return (
    <div className="space-y-6 text-white">
        <p className="text-5xl text-center font-black">{data.handle}</p>
        {
            data.image &&
            <img className="mx-auto max-w-[250px]" src={data.image} alt="profile image" />
        }
        <p className="text-center text-lg font-bold">{data.description}</p>
        <div className="gap-6 mt-20 flex flex-col">
            {
                links.length 
                ? links.map((link: SocialNetwork) => (
                    <a 
                    className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    key={link.name}
                    >
                        Visit my: {link.name} </a>
                ))
                : <p className="text-center">There is not links in this profile</p>
            }
        </div>
    </div>
  )
}

export default HandleData