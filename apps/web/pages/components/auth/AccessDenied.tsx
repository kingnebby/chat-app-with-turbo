import { useSession } from 'next-auth/react'
import React, { PropsWithChildren, useEffect } from 'react'
import { NextSession } from './types'

function AccessDenied(props: PropsWithChildren) {
  const { data, status } = useSession()
  const session = data as NextSession
  console.log('AccessDenied Render', status);
  // useEffect(() => {
  //   console.log('AccessDenied useEffect Render');
  //   if (!session) return

  //   console.log(session.accessToken);

  //   localStorage.setItem('accessToken', session.accessToken)
  // }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return (
      <>
        <p>Access Denied</p>
        <a href="/api/auth/signin" className="btn btn-success">Enter</a>
      </>
    )
  }

  console.log(session.accessToken);
  localStorage.setItem('accessToken', session.accessToken)
  return (
    <>
      {props.children}
    </>
  )
}

export default AccessDenied