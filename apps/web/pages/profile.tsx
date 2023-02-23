import AccessDenied from './components/auth/AccessDenied';
import Profile from './components/Profile';

function ProfilePage(props: any) {
  return (
    <AccessDenied>
      <Profile />
    </AccessDenied>
  )
}

export default ProfilePage