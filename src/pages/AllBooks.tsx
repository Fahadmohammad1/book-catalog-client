import { ChangeEvent, useState } from "react";
import Book from "../components/Book";
import { useGetFilterdBooksQuery } from "../redux/features/books/bookApi";
import Loading from "../shared/Loading";
import { IBook } from "../types/globalTypes";

export default function AllBooks() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useGetFilterdBooksQuery(`searchTerm=${searchText}`);

  const handleSearch = (e : ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="my-10">
      <form className="flex justify-center">
        <input
          type="text"
          placeholder="Type here"
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
        />
      </form>
      <div className="grid grid-cols-3 gap-10 my-10 px-10">
        {isLoading ? (
          <Loading />
        ) : (
          data.data?.map((book : IBook) => <Book key={book._id} book={book} />)
        )}
      </div>
    </section>
  );
}
