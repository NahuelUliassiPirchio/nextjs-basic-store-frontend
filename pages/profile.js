import { AuthProvider } from '../hooks/useAuth'
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'

export default function Profile () {
  return (
    <AuthProvider>
      <ProfileInfo />
    </AuthProvider>
  )
}
