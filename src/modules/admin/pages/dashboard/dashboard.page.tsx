import { useAuthStore } from '../../../../stores'

export const DashboardPage = () => {

  const user = useAuthStore( state => state.user )

  return (
    <div>
      <h1> Dashboard Page </h1>
      <p> This is a private route </p>
      <pre>
        { JSON.stringify( user, null, 2 ) }
      </pre>
    </div>
  )
}
