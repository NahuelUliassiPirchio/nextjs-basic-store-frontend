import { useAuth } from '../hooks/useAuth'
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'

export default function Profile () {
  const auth = useAuth()
  const { user } = auth
  console.log(user)

  return (
    <ProfileInfo user={user} />
  )
}
