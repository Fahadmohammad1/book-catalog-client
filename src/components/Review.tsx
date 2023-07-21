import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useGetReviewQuery,
  usePostReviewMutation,
} from "../redux/features/books/bookApi";
import Swal from "sweetalert2";
import {FaRegCommentDots} from 'react-icons/fa'
import {FiCornerRightDown} from 'react-icons/fi'
import { ICredential } from "../types/globalTypes";
import Loading from "../shared/Loading";

interface IProps {
  id: string;
}

interface IReview {
  bookId: string;
  name: string;
  email: string;
  reviewText: string;
}

export default function Review({ id }: IProps) {
  const { data } = useGetReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
  });

  const [postReview, { isLoading, isSuccess }] =
    usePostReviewMutation();

   useEffect(() => {
    if(isSuccess){
      Swal.fire({
        title: 'Successfull',
        text: 'Review added',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      })
      }
   }, [isSuccess])

  let user: ICredential | null = null;
  const userData = localStorage.getItem("user");

  if (userData) {
    user = JSON.parse(userData);
  }

  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userData) {
      Swal.fire({
        title: "Failed!",
        text: "Please Login",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } else {
      const options = {
        bookId: id,
        name: user?.name,
        email: user?.email,
        reviewText: inputValue,
      };
  
      postReview(options);
  
      setInputValue("");
    }
  
      
    
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  if(isLoading) {
    return <Loading/>
  }
  return (
    <div className="flex justify-center gap-10">
      <div className="mt-3">
        <form
          className="flex gap-5 items-center flex-col"
          onSubmit={handleSubmit}
        >
          <textarea
            placeholder="Add Review"
            onChange={handleChange}
            value={inputValue}
            className="textarea textarea-bordered textarea-xs w-full max-w-xs"
          ></textarea>
          <button
            type="submit"
            className="flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 btn btn-sm  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-5">
        {data?.data
          ? data?.data?.map((r: IReview) => (
              <p >
                <span className="flex items-center text-gray-500"><FaRegCommentDots className="text-green-400 mr-1"/>{r.name}<FiCornerRightDown/> </span>{r.reviewText}
              </p>
            ))
          : ""}
      </div>
    </div>
  );
}
