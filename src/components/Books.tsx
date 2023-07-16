import { useAppSelector } from "../redux/hook"
import { IBook } from "../types/globalTypes"
import Book from "./Book"


export default function Books() {
    const {books} = useAppSelector(state => state.book)
  return (
   <section className="grid grid-cols-3 gap-10 my-10 px-10">
     {books.map((book : IBook) => <Book key={book._id} book={book} />)}
   </section>
  )
}
