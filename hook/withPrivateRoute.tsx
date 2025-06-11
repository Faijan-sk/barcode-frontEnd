import { useEffect, ComponentType } from 'react'

import { useContext } from 'react'
import { AuthContext } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'

const withPrivateRoute = (WrappedComponent: ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const { isAuthenticated, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace('/send-top-up')
      }
    }, [loading, isAuthenticated, router])

    console.log('Loading...')
    if (loading) {
      return <div>Loading...</div>
    }

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withPrivateRoute
