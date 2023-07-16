import { useAppSelector } from "../redux/hook"


export default function books() {
    const books = useAppSelector(state => console.log(state))
  return (
    <div>books</div>
  )
}
