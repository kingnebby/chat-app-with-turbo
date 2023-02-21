import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AccessDenied from './components/auth/AccessDenied';
import Profile from './components/Profile';

function ProfilePage(props: any) {
  // const { status } = useSession()
  console.log('ProfilePage Render')
  console.log(props);

  // if (status === 'loading') {
  //   return <p>loading</p>
  // }

  return (
    <AccessDenied>
      <Profile />
    </AccessDenied>
  )
}

export default ProfilePage