import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/bookApi";
import Review from "../components/Review";


export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSingleBookQuery(id);


  return (
    <section>
      <div className="flex flex-col justify-center h-screen items-center">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-sm md:max-w-3xl mx-auto border border-white bg-white">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img
              src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Englishe_durbolder_jonno_VOCAB_Therapy-Saiful_Islam-babe5-241679.jpg"
              alt="book"
              className="rounded-xl"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center"></div>
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
              {data?.data?.title}
            </h3>
            <p className="md:text-lg text-gray-500 text-base mt-2">
              Author : {data?.data?.author}
            </p>
            <p className="md:text-lg text-gray-500 text-base mt-2">
              Genre : {data?.data?.genre}
            </p>
            <p className="md:text-lg text-gray-500 text-base mt-2">
              PublicationDate :{" "}
              {new Date(data?.data?.publicationDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
	  <Review id={id!}/>
      
    </section>
  );
}