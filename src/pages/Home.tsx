import { useEffect } from "react";
import { useGetBooksQuery } from "../redux/features/books/bookApi"
import { setBooks } from "../redux/features/books/bookSlice";
import { useAppDispatch } from "../redux/hook";


export default function Home() {
  const {data, isLoading} = useGetBooksQuery(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setBooks(data.data))
    }
  }, [data, isLoading, dispatch])


  console.log(data, isLoading);
  return (
    <div>
      <h1>this is home</h1>
    </div>
  )
}
