import { useQueryClient } from "@tanstack/react-query"

const AdminNavigation = () => {
  const queryClient = useQueryClient()
  const signOut = () => {
    localStorage.removeItem('devTree_access_token')
    queryClient.invalidateQueries({queryKey:['profile']})

  }
  return (
    <button
      className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
      onClick={signOut}
    >
      Cerrar Sesión
    </button>
  )
}

export default AdminNavigation