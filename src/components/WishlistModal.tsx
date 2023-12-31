import { useGetWishListQuery } from "../redux/features/books/bookApi";
import { toggleModal } from "../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import Loading from "../shared/Loading";
import { IBook } from "../types/globalTypes";

interface IWishlistResponse {
  book : IBook
}

export default function WishlistModal() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.wishlist);
  const {user} = useAppSelector(state => state.user)

  const {data, isLoading} = useGetWishListQuery(user.email)
  
  if(isLoading) {
    return <Loading/>
  }
  return (
    <section>
      {status && (
        <div>
          <dialog id="wishlistModal" className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box">
              <button
                onClick={() => dispatch(toggleModal())}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                      </tr>
                    </thead>
                    <tbody>
                     {data?.data?.map((book : IWishlistResponse) =>  <tr key={book.book._id}>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={book?.book?.imageUrl}
                                  alt="book"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                        <div>
                              <div className="font-bold"><h6>{book.book.title}</h6></div>
                            </div>
                        </td>
                        <td>
                          <div>
                          <p>{book.book.author}</p>
                          </div>
                        </td>
                      </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </section>
  );
}
