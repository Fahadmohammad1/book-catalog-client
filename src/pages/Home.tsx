import { useEffect } from "react";
import { useGetBooksQuery } from "../redux/features/books/bookApi"
import { setBooks } from "../redux/features/books/bookSlice";
import { useAppDispatch } from "../redux/hook";
import Books from "../components/Books";
import Banner from "../components/Banner";

export default function Home() {
  const {data, isLoading} = useGetBooksQuery(undefined, {refetchOnMountOrArgChange : true , pollingInterval : 3000})
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setBooks(data.data))
    }
  }, [data, isLoading, dispatch])

  return (
    <div>
      <Banner/>
     <Books/>
    </div>
  )
}
