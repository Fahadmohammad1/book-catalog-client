import { ChangeEvent, FormEvent, useState } from "react";
import { useGetReviewQuery, usePostReviewMutation } from "../redux/features/books/bookApi";

interface IProps {
    id: string;
  }

export default function Review({id }: IProps) {
    const {data} = useGetReviewQuery(id, {refetchOnMountOrArgChange : true , pollingInterval : 3000})
    console.log(data);

    const [postReview, {isLoading, isError, isSuccess}] = usePostReviewMutation()
  console.log(isLoading);
  console.log(isError);
  console.log(isSuccess);

  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    const options = {
      id: id,
      data: { 
        name : '',
        reviewText : inputValue
       },
    };
    
    postReview(options)

    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
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
                  className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 btn btn-sm  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Submit
                </button>
              </form>
            </div>
        <div>
        {data?.data
          ? data?.data?.review.map(
              (r: { name: string; reviewText: string }) => (
                <p>
                  <span>{r.name}: </span> {r.reviewText}
                </p>
              )
            )
          : ""}
      </div>
    </div>
  )
}
