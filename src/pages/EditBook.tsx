import { AiOutlineSwapLeft } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../shared/Loading";
import { useForm } from "react-hook-form";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookApi";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useSingleBookQuery(id);
  const [updateBook, { isSuccess, isLoading: updateLoading }] =
    useUpdateBookMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Successfull",
        text: "Book updated sucessfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/");
    }
  }, [isSuccess]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: data?.data?.title,
      author: data?.data?.author,
      genre: data?.data?.genre,
      imageUrl: data?.data?.imageUrl,
      publicationDate: data?.data?.publicationDate
	  ? new Date(data.data.publicationDate).toISOString().slice(0, 10)
	  : ""
    },
  });

  const onSubmit = (bookInfo: Record<string, string>) => {
    const options = {
      id: id,
      data: {
        ...bookInfo,
      },
    };

    updateBook(options);

    reset();
  };

  if (isLoading || updateLoading) {
    return <Loading />;
  }
  console.log(new Date(
	data?.data?.publicationDate
  ).toLocaleDateString());
  return (
    <section>
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
        <div className=" flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Update Your Book</h1>
            <button className="btn btn-sm">
              <AiOutlineSwapLeft />
              <Link to="/">Back To Home</Link>
            </button>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  id="title"
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
                  id="author"
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
                  id="genre"
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
                  id="publicationDate"
                  placeholder="Publication Date"
                  {...register("publicationDate", {
                    required: true,
					valueAsDate : true
                  })}
                />
              </div>

              <div className="">
                <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  id="imageUrl"
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
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
