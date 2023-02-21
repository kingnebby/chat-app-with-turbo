import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export type UserProfile = {
  email: string,
  userId: number
  username: string
  roles: string[]
}

function Profile() {
  const [data, setData] = useState<UserProfile>();
  console.log('Profile Render')
  const token = localStorage.getItem('accessToken')
  console.log(token)

  useEffect(() => {
    console.log('Profile UseEffect Render');
    console.log(token)

    fetch('http://localhost:9001/users/profile',
      {
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [token]);

  return (
    <>
      <h1>{data?.username}</h1>
      <p>You can view this page because you are signed in.</p>
      <div>
        email: {data?.email}
        <br />
        roles: {data?.roles}
        <br />
        id: {data?.userId}
      </div>
    </>
  )
}

export default Profile