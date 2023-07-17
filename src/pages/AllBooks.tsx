
import Book from "../components/Book"
import { useAppSelector } from "../redux/hook"

export default function AllBooks() {
  const {books} = useAppSelector(state => state.book)

    const handleSearch = (data : string) => {
      console.log(data);
      
    }
  return (
    <section className="my-10">
      <form className="flex justify-center">
      <input type="text" placeholder="Type here" onChange={e => handleSearch(e.target.value)} className="input input-bordered w-full max-w-xs"/>
      </form>
      <div className="grid grid-cols-3 gap-10 my-10 px-10">
      {books.map(book => <Book key={book._id} book={book}/>)}
    </div>
    </section>
  )
}
