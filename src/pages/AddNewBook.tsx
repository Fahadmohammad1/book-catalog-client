import { useForm } from "react-hook-form";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useAddNewBookMutation } from "../redux/features/books/bookApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useAppSelector } from "../redux/hook";
import { Link } from "react-router-dom";
import { AiOutlineSwapLeft } from "react-icons/ai";

export default function AddNewBook() {
  const [errorMessage, setErrorMessage] = useState("");
  type CustomError = FetchBaseQueryError & {
    data: {
      success: boolean;
      message: string;
      errorMessages: [];
    };
  };

  const [addNewBook, { isLoading, isError, isSuccess, error, data }] =
    useAddNewBookMutation();

  useEffect(() => {
    if (isError && error) {
      const customError = error as CustomError;
      if (customError.data) {
        setErrorMessage(customError.data.message);
      }
    }
  }, [isError, error]);

  const { user } = useAppSelector((state) => state.user);

  if (isSuccess) {
    Swal.fire({
      title: "Successfull",
      text: data.message,
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  if (isError && error) {
    Swal.fire({
      title: "Failed!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  if (!user.email) {
    Swal.fire({
      title: "Failed!",
      text: "Please Login First",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (bookInfo: Record<string, string>) => {
    const options = {
      title: bookInfo.title,
      author: bookInfo.author,
      genre: bookInfo.genre,
      publicationDate: bookInfo.publicationDate,
      imageUrl : bookInfo.imageUrl,
      addedBy: user.email,
      year: new Date(bookInfo.publicationDate).getFullYear(),
    };
    addNewBook(options);

    reset();
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
        <div className=" flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">
              Add Your Book To Our Website
            </h1>
            <Link to="/">
              <button className="btn btn-sm w-full bg-white text-black">
                <AiOutlineSwapLeft />
                Back To Home
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: true,
                  })}
                />
              </div>

              <div className="">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Author"
                  {...register("author", {
                    required: true,
                  })}
                />
              </div>

              <div className="">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Genre"
                  {...register("genre", {
                    required: true,
                  })}
                />
              </div>

              <div className="">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="date"
                  placeholder="Publication Date"
                  {...register("publicationDate", {
                    required: true,
                  })}
                />
              </div>

              <div className="">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Image URL"
                  {...register("imageUrl", {
                    required: true,
                  })}
                />
              </div>

              <div className="">
                <input
                  className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  type="submit"
                  value="Add"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
