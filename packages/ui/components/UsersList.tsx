import { useQuery } from "@tanstack/react-query";
import { UsersDTO } from "./types/users";

export function UsersList() {
  const { isLoading, error, data } = useQuery<UsersDTO[]>({
    queryKey: ['data'],
    queryFn: async () => {
      // TODO: this much better X-D
      const res = await fetch('http://localhost:9001/users', {
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtQGplbWluaS5pbyIsInVzZXJuYW1lIjoiam95d2F2ZSIsInN1YiI6Miwicm9sZXMiOlsiQURNSU4iLCJVU0VSIl0sImlhdCI6MTY3NDg0OTE5NywiZXhwIjoxNjc0ODQ5MjU3fQ.2_ctdNSplhQG0kI4okzbKLphrxiQNR6ysUECtm2UXkw'
        }
      })
      if (res.status === 200) {
        return res.json()
      }
      throw new Error('could not fetch users')
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
