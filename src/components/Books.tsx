import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import Book from "./Book";

export default function Books() {
  const { books } = useAppSelector((state) => state.book);
  return (
    <section>
      <h2 className="text-center text-3xl font-bold mt-8">
        Recently Added Books
      </h2>
      <div className="grid grid-cols-4 gap-10 my-10 px-10">
        {books
          .map((book: IBook) => <Book key={book._id} book={book} />)
          .reverse()
          .slice(0, 10)}
      </div>
    </section>
  );
}
