import { useSession } from 'next-auth/react'
import React from 'react'

function Profile() {
  console.log('loading test page');

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  )
}

export default Profile