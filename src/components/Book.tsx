import { Link, useLocation } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { AiOutlineHeart } from "react-icons/ai";

interface IProps {
    book: IBook;
  }

export default function Book({book} : IProps) {
    const {pathname} = useLocation()

    const addToWishList = () => {

    }
    
  return (
    <div className="flex flex-col gap-1">
      <Link to={`/book-details/${book._id}`} className="flex flex-col justify-center">
        <img title="Click to view details" src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Englishe_durbolder_jonno_VOCAB_Therapy-Saiful_Islam-babe5-241679.jpg" className="hover:translate-x-1 hover:-translate-y-1 delay-50 duration-100" />
      </Link>

      <div className="border-2">
    {pathname === '/' && <div className="flex items-center justify-between p-3">
    <p className="hover:text-purple-500 flex text-black font-bold justify-between items-center"> {book.title}</p> 
    <p onClick={addToWishList} ><AiOutlineHeart className="text-2xl" title="Add to wishlist"/></p>
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
