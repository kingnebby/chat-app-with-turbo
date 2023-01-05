import { Button } from "ui";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { UsersList } from "./UsersList";

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
