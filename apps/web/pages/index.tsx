import { UsersList } from "ui";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
