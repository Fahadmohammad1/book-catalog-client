import { useEffect } from "react";
import { useGetBooksQuery } from "../redux/features/books/bookApi"
import { setBooks } from "../redux/features/books/bookSlice";
import { useAppDispatch } from "../redux/hook";
import Books from "../components/Books";


export default function Home() {
  const {data, isLoading} = useGetBooksQuery(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setBooks(data.data))
    }
  }, [data, isLoading, dispatch])
  
  return (
    <div>
     <Books/>
    </div>
  )
}
