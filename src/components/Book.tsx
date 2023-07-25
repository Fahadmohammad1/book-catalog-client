import { Link, useLocation } from "react-router-dom";
import { IBook, ICredential } from "../types/globalTypes";
import { AiFillHeart } from "react-icons/ai";
import {
  useAddToReadingListMutation,
  useAddToWishListMutation,
} from "../redux/features/books/bookApi";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { GiNotebook } from "react-icons/gi";

interface IProps {
  book: IBook;
}

export default function Book({ book }: IProps) {
  const { pathname } = useLocation();
  const [addToWishList, { isSuccess, isLoading, isError, error }] =
    useAddToWishListMutation();
  const [
    addToReadingList,
    {
      isSuccess: readingSuccess,
      isLoading: readingLoading,
      isError: readingIsError,
      error: readingError,
    },
  ] = useAddToReadingListMutation();

  let user: ICredential | null = null;
  const userData = localStorage.getItem("user");

  if (userData) {
    user = JSON.parse(userData);
  }

  const handleAddToWishList = () => {
    if (!userData) {
      Swal.fire({
        title: "Failed!",
        text: "Please Login",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } else {
      const data = {
        email: user?.email,
        book: book._id,
      };

      addToWishList(data);
    }
  };

  const handleAddToReadingList = () => {
    const options = {
      email: user?.email,
      book: book._id,
    };

    addToReadingList(options);
  };

  useEffect(() => {
    if (isSuccess || readingSuccess) {
      Swal.fire({
        title: "Successfull",
        text: "Added",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    if ((isError && error) || (readingIsError && readingError)) {
      Swal.fire({
        title: "Failed!",
        text: "Book Already Exist",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }, [isSuccess, isError, readingSuccess, readingIsError]);

  if (isLoading || readingLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-1">
      <Link
        to={`/book-details/${book._id}`}
        className="flex flex-col justify-center border-2 rounded-md"
      >
        <img
          title="Click to view details"
          src={book?.imageUrl}
          className="hover:translate-x-1 hover:-translate-y-1 delay-50 duration-100 rounded-md"
        />
      </Link>

      <div className="border-2 shadow-lg rounded-lg">
        {pathname === "/" && (
          <div className="flex items-center justify-between p-3">
            <p className="text-purple-500 flex hover:text-black font-bold justify-between items-center">
              {" "}
              {book.title}
            </p>

            <div className="flex gap-2">
              <p className="cursor-pointer" onClick={handleAddToWishList}>
                <AiFillHeart
                  className="text-2xl text-red-500"
                  title="Add to wishlist"
                />
              </p>
              <p className="cursor-pointer" onClick={handleAddToReadingList}>
                <GiNotebook
                  className="text-2xl text-blue-500"
                  title="Add to readingList"
                />
              </p>
            </div>
          </div>
        )}
        {pathname === "/all-books" && (
          <div>
            <p className="text-purple-500 hover:text-black font-bold text-center p-2">
              {book.title}{" "}
            </p>
            <p className="hover:text-black text-gray-500 font-bold text-center p-2">
              Author : {book.author}{" "}
            </p>
            <p className="hover:text-black text-gray-500 font-bold text-center p-2">
              Genre : {book.genre}{" "}
            </p>
            <p className="hover:text-black text-gray-500 font-bold text-center p-2">
              Publication Date :{" "}
              {new Date(book.publicationDate).toLocaleDateString()}{" "}
            </p>

            <div className="flex justify-between p-3 border-t-2">
              <p className="cursor-pointer" onClick={handleAddToWishList}>
                <AiFillHeart
                  className="text-2xl text-red-500"
                  title="Add to wishlist"
                />
              </p>
              <p className="cursor-pointer" onClick={handleAddToReadingList}>
                <GiNotebook
                  className="text-2xl text-blue-500"
                  title="Add to readingList"
                />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
