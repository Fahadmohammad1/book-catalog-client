import { useGetReadingListQuery, useUpdateReadingListMutation } from "../redux/features/books/bookApi";
import { toggleReadingModal } from "../redux/features/readingList/readingListSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import Loading from "../shared/Loading";
import { IBook } from "../types/globalTypes";

interface IWishlistResponse {
  book: IBook;
  willReadSoon : boolean;
  isReading : boolean;
  isFinished : boolean
}

export default function ReadingListModal() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { open } = useAppSelector((state) => state.readingList);

  const { data, isLoading } = useGetReadingListQuery(user.email);

  const [updateReadingList, { isLoading : updateLoading}] = useUpdateReadingListMutation()

  const readingHandler = (bookId : string, status: boolean) => {
    const options = {
      email : user.email,
      data : {
        book : bookId,
        willReadSoon : false,
        isReading : status,
        isFinished : false
      }
    }

    updateReadingList(options)
  }
  const readSoonHandler = (bookId : string, status: boolean) => {
    const options = {
      email : user.email,
      data : {
        book : bookId,
        willReadSoon : status,
        isReading : false,
        isFinished : false
      }
    }

    updateReadingList(options)
  }
  const finishedHandler = (bookId : string, status: boolean) => {
    const options = {
      email : user.email,
      data : {
        book : bookId,
        willReadSoon : false,
        isReading : false,
        isFinished : status
      }
    }

    updateReadingList(options)
  }

  if (isLoading || updateLoading) {
    return <Loading />;
  }
  return (
    <section >
      {open && (
        <div>
          <dialog id="readingModal" className="modal modal-middle mt-7" open>
            <div className="modal-box w-11/12 max-w-4xl">
              <button
                onClick={() => dispatch(toggleReadingModal())}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-4">
                    <h3>Image</h3>
                    <h3>Title</h3>
                    <h3>Author</h3>
                    <h3>Status</h3>
                  </div>
                  {data?.data?.map((book: IWishlistResponse) => (
                    <div className="card w-full bg-base-100 shadow-xl mt-5">
                      <div className="card-body">
                        <div className="grid grid-cols-4">
                          <div className="mask mask-squircle w-14 h-16 ">
                            <img
                              src={book?.book?.imageUrl}
                              alt="book"
                            />
                          </div>
                          <div className="flex items-center">
                            <p>{book.book.title}</p>
                          </div>
                          <div className="flex items-center">
                            <p>{book.book.author}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                onClick={() => readSoonHandler(book.book._id, !book?.willReadSoon)}
                                checked={book?.willReadSoon}
                                className="checkbox checkbox-xs"
                              />{" "}
                              <p>Read Soon</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                onClick={() => readingHandler(book.book._id, !book?.isReading)}
                                checked={book?.isReading}
                                className="checkbox checkbox-xs"
                              />{" "}
                              <p>Reading</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                onClick={() => finishedHandler(book.book._id, !book?.isFinished)}
                                checked={book?.isFinished}
                                className="checkbox checkbox-xs"
                              />{" "}
                              <p>Finished</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </section>
  );
}
