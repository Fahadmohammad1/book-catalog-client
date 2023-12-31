import { useNavigate, useParams } from "react-router-dom";
import { useDeletBookMutation, useSingleBookQuery } from "../redux/features/books/bookApi";
import Review from "../components/Review";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";
import { useAppSelector } from "../redux/hook";


export default function BookDetails() {
  const { id } = useParams();
  const {user} = useAppSelector(state => state.user)
  const { data, isLoading } = useSingleBookQuery(id);
  const [deleteBook, {isLoading : deleteLoading }] = useDeletBookMutation()

  const navigate = useNavigate()


  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Book has been deleted.',
          'success'
        )

        deleteBook(id)
        navigate('/')
      }
    })
  }

  if(isLoading || deleteLoading) {
    return <Loading/>
  }
  return (
    <section>
      <div className="flex flex-col mt-10">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-sm md:max-w-3xl mx-auto border border-white bg-white">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img
              src={data?.data?.imageUrl}
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
           {user?.email === data?.data?.addedBy && <div className="flex gap-5 pt-3">
           <button
           onClick={() => navigate(`/edit-book/${id}`)}
            className="flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 btn btn-sm  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
          >
            Edit
          </button>
          <button
          onClick={handleDelete}
          
            className="flex justify-center bg-red-500  hover:bg-purple-700 text-gray-100 btn btn-sm  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
          >
            Delete
          </button>
           </div>}
          </div>
        </div>
      </div>
	  <Review id={id!}/>
    </section>
  );
}
