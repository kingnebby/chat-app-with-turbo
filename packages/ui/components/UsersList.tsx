import { useQuery } from "@tanstack/react-query";
import { UsersDTO } from "./types/users";

export function UsersList() {
  const { isLoading, error, data } = useQuery<UsersDTO[]>({
    queryKey: ['data'],
    queryFn: async () => {
      const res = await fetch('http://localhost:9001/users', {})
      return res.json()
    }
  })

  if (isLoading) {
    return <div>Loading....</div>
  }
  if (error) {
    return <div>{(error as Error).message}</div>
  }

  return <div>
    {data?.map((el, index) => {
      return <div key={index}>{el.username}</div>
    })}
  </div>
}
