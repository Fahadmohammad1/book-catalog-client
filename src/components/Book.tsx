import { Link, useLocation } from "react-router-dom";
import { IBook } from "../types/globalTypes";

interface IProps {
    book: IBook;
  }

export default function Book({book} : IProps) {
    const {pathname} = useLocation()
    
  return (
    <div className="flex flex-col gap-1">
      <Link to="/" className="flex flex-col justify-center">
        <img src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Englishe_durbolder_jonno_VOCAB_Therapy-Saiful_Islam-babe5-241679.jpg" className="hover:translate-x-1 hover:-translate-y-1 delay-50 duration-100" />
      </Link>

      <div className="border-2">
      <p className="hover:text-purple-500 text-black font-bold text-center p-2"> {book.title} </p> 
      {pathname === '/all-books' && <div> 
      <p className="hover:text-purple-500 text-black font-bold text-center p-2"> {book.author} </p> 
        </div>}
        </div>  
    </div>
  )
}
