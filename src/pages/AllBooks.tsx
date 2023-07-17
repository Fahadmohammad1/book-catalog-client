import { ChangeEvent, useState } from "react";
import Book from "../components/Book";
import { useGetFilterdBooksQuery } from "../redux/features/books/bookApi";
import Loading from "../shared/Loading";
import { IBook } from "../types/globalTypes";

export default function AllBooks() {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { data, isLoading } = useGetFilterdBooksQuery(`searchTerm=${searchText}`);

  const handleSearch = (e : ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSelectChange = (e :  ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  console.log(selectedOption);
  
  return (
    <section className="my-10 grid grid-cols-4">
      <div className="col-span-1 mt-8 pl-5">
      <form className="flex justify-center flex-col">
        <input
          type="text"
          placeholder="Search (title, author, genre)"
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
        />
        
        <div className="mt-3 flex justify-around">
        <select value={selectedOption} onChange={handleSelectChange} className="input input-bordered">
  <option value="">All (genre)</option>
  {[...new Set<string>(data?.data?.map((book: IBook) => book.genre))].map((genre: string) => (
    <option key={genre} value={genre}>
      {genre}
    </option>
  ))}
</select>
        {/* <select value={selectedOption} onChange={handleSelectChange} className="input input-bordered">
        <option value="">All (year)</option>
        {data?.data?.map((book : IBook) => (
          <option key={new Date(book.publicationDate).getFullYear()} value={new Date(book.publicationDate).getFullYear()}>
            {new Date(book.publicationDate).getFullYear()}
          </option>
        ))}
      </select> */}
        </div>
      </form>
      </div>
      <div className="col-span-3">
      <div className="grid grid-cols-3 gap-10 my-8 px-10">
        {isLoading ? (
          <Loading />
        ) : (
          data?.data?.map((book : IBook) => <Book key={book._id} book={book} />)
        )}
      </div>
      </div>
    </section>
  );
}
