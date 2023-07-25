import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import Book from "./Book";
import Loading from "../shared/Loading";

export default function Books() {

  const { data , isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
  });
  
  return (
    <section>
      <h2 className="text-center text-3xl font-bold mt-8">
        Recently Added Books
      </h2>
      {isLoading? <Loading/> : <div className="grid grid-cols-4 gap-10 my-10 px-10">
        {data?.data
          .map((book: IBook) => <Book key={book._id} book={book} />)
          .reverse()
          .slice(0, 10)}
      </div>}
    </section>
  );
}
