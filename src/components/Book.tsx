import { Link, useLocation } from "react-router-dom";
import { IBook, ICredential } from "../types/globalTypes";
import { AiOutlineHeart } from "react-icons/ai";
import { useAddToReadingListMutation, useAddToWishListMutation } from "../redux/features/books/bookApi";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { GiNotebook } from "react-icons/gi";

interface IProps {
    book: IBook;
  }

export default function Book({book} : IProps) {
    const {pathname} = useLocation()
    const [addToWishList, {isSuccess, isLoading,isError, error}] = useAddToWishListMutation()
    const [addToReadingList, {isSuccess : readingSuccess, isLoading : readingLoading,isError : readingIsError, error : readingError}] = useAddToReadingListMutation()
  
    let user: ICredential | null = null;
  const userData = localStorage.getItem("user");

  if (userData) {
    user = JSON.parse(userData);
  }
   
  if(!userData){
    Swal.fire({
      title: "Failed!",
      text: "Please Login",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

    const handleAddToWishList = () => {
      
        const data = {
          email : user?.email,
          book : book._id
        }

      addToWishList(data)
      
    }

    const handleAddToReadingList = () => {
      
        const options = {
          email : user?.email,
          book : book._id
        }

      addToReadingList(options)
      
    }

    useEffect(() => {
      if(isSuccess || readingSuccess){
        Swal.fire({
          title: 'Successfull',
          text: 'Added',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        }

        if((isError && error) || (readingIsError && readingError) ){
          Swal.fire({
            title: 'Failed!',
            text: 'Book Already Exist',
            icon: 'error',
            confirmButtonText: 'Try Again'
          })
          }
    }, [isSuccess, isError, readingSuccess, readingIsError])

      if(isLoading || readingLoading) {
        return <Loading/>
      }

  return (
    <div className="flex flex-col gap-1">
      <Link to={`/book-details/${book._id}`} className="flex flex-col justify-center">
        <img title="Click to view details" src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Englishe_durbolder_jonno_VOCAB_Therapy-Saiful_Islam-babe5-241679.jpg" className="hover:translate-x-1 hover:-translate-y-1 delay-50 duration-100" />
      </Link>

      <div className="border-2">
    {pathname === '/' && <div className="flex items-center justify-between p-3">
    <p className="hover:text-purple-500 flex text-black font-bold justify-between items-center"> {book.title}</p> 
    
    <div className="flex gap-2">
    <p className="cursor-pointer" onClick={handleAddToWishList} ><AiOutlineHeart className="text-2xl" title="Add to wishlist"/></p>
    <p className="cursor-pointer" onClick={handleAddToReadingList} ><GiNotebook className="text-2xl" title="Add to readingList"/></p>
    </div>
    </div>
     }
      {pathname === '/all-books' && <div> 
      <p className="hover:text-purple-500 text-black font-bold text-center p-2">Title : {book.title} </p>
      <p className="hover:text-purple-500 text-black font-bold text-center p-2">Author :  {book.author} </p> 
      <p className="hover:text-purple-500 text-black font-bold text-center p-2">Genre :  {book.genre} </p> 
      <p className="hover:text-purple-500 text-black font-bold text-center p-2">Publication Date :  {new Date(book.publicationDate).toLocaleDateString()} </p> 
        </div>}
        </div>  
    </div>
  )
}
