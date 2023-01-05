import { Button } from "ui";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App() {
  return <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>

}

export function Home() {
  return (
    <div>
      <h1>Web</h1>
      All Users
      <UsersList />
    </div>
  );
}

interface UsersDTO {
  username: string
}

function UsersList() {

  // Do a query
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
  console.log(data);

  return <div>
    {data?.map((el) => {
      return <div key="1">{el.username}</div>
    })}
  </div>
}
