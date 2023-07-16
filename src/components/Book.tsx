import { IBook } from "../types/globalTypes";

interface IProps {
    book: IBook;
  }

export default function Book({book} : IProps) {
    
  return (
    <div className="card card-side bg-base-100 shadow-xl">
  <figure><img src="https://www.vivekarvind.com/content/images/2022/02/Atomic_Habits-2.png" alt="Book"/></figure>
  <div className="card-body">
    <h2 className="card-title">{book.title}</h2>
    <p>{book.author}</p>
    <p>{book.genre}</p>
    <p>{book.publicationDate.slice(0, 10)}</p>
  </div>
</div>
  )
}
