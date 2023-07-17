import { ChangeEvent, useState } from "react";
import Book from "../components/Book";
import { useFilterBooksQuery, useGetSearchedBooksQuery } from "../redux/features/books/bookApi";
import Loading from "../shared/Loading";
import { IBook } from "../types/globalTypes";

export default function AllBooks() {
  let userData = null;
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { data, isLoading } = useGetSearchedBooksQuery(`searchTerm=${searchText}`);
  const { data: filterdata, isLoading: filterLoading } = useFilterBooksQuery(`genre=${selectedOption}&year=${selectedYear}`);
  
  userData = data;
  
  if (selectedOption && selectedYear) {
    userData = filterdata;
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSelectGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSelectYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  if (isLoading || filterLoading) {
    return <Loading />;
  }

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
            <select value={selectedOption} onChange={handleSelectGenreChange} className="input input-bordered">
              <option value="">All (genre)</option>
              {[...new Set<string>(data?.data?.map((book: IBook) => book.genre))].map((genre: string) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select value={selectedYear} onChange={handleSelectYearChange} className="input input-bordered">
              <option value="">All (year)</option>
              {[...new Set<string>(data?.data?.map((book: IBook) => new Date(book.publicationDate).getFullYear()))].map((year: string) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className="col-span-3">
        <div className="grid grid-cols-3 gap-10 my-8 px-10">
          {isLoading ? (
            <Loading />
          ) : (
            userData?.data?.map((book: IBook) => <Book key={book._id} book={book} />)
          )}
        </div>
      </div>
    </section>
  );
}
