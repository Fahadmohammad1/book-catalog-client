import MainLayout from "./layouts/MainLayout"
import { setUser } from "./redux/features/user/userSlice"
import { useAppDispatch } from "./redux/hook"

function App() {
  const dispatch = useAppDispatch()

  let user = null
  const userData = localStorage.getItem('user')
  
  if(userData){
    user = JSON.parse(userData)
  }

  dispatch(setUser(user))
  return (
    <div>
      <MainLayout/>
    </div>
  )
}

export default App
