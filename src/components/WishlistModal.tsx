import { toggleModal } from "../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function WishlistModal() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.wishlist);
  console.log(status);
  return (
    <section>
      {status && (
        <div>
          <dialog id="wishlistModal" className="modal modal-bottom sm:modal-middle" open>
            <form method="dialog" className="modal-box">
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
                      {/* row 1 */}
                      <tr>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src="/tailwind-css-component-profile-2@56w.png"
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                           
                          </div>
                        </td>
                        <td>
                        <div>
                              <div className="font-bold">Hart Hagerty</div>
                            </div>
                        </td>
                        <td>
                          <div>
                          Zemlak, Daniel and Leannon
                          </div>
                        </td>
                      
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </section>
  );
}
