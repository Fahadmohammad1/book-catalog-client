import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setUser } from "../redux/features/user/userSlice";
import { AiFillHeart } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { toggleModal } from "../redux/features/wishlist/wishlistSlice";
import { toggleReadingModal } from "../redux/features/readingList/readingListSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(setUser({ name: null, email: null }));
  };
  return (
    <div className="navbar bg-slate-100 text-gray-800 font-bold">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-xl uppercase text-purple-800"
        >
          Book Catalog
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/all-books">All Books</Link>
          </li>
          {user.email && (
            <li>
              <Link to="/add-book">Add New Book</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div>
            <button
              className=""
              id="wishlistModal"
              onClick={() => dispatch(toggleModal())}
            >
              <AiFillHeart className="text-2xl mr-3 text-red-500" />
            </button>
            <button
              className=""
              id="readingModal"
              onClick={() => dispatch(toggleReadingModal())}
            >
              <GiNotebook className="text-2xl mr-3 text-blue-500" />
            </button>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-200 rounded-box w-52"
          >
            {!user.email && (
              <div>
                <li className="font-bold">
                  <Link to="/login">Login</Link>
                </li>
                <li className="font-bold">
                  <Link to="/signup">Sign Up</Link>
                </li>
              </div>
            )}
            {user.email && (
              <div>
                <li className="font-bold">
                  <p className="text-lg">{user.name}</p>
                </li>
                <li className="font-bold">
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
