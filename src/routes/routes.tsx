import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import AllBooks from "../pages/AllBooks";
import AddNewBook from "../pages/AddNewBook";
import BookDetails from "../pages/BookDetails";
import EditBook from "../pages/EditBook";
import PrivateRoute from "./PrivateRoute";


const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path : '/all-books',
          element : <AllBooks/>
        },
        {
          path : '/add-book',
          element : <PrivateRoute><AddNewBook/></PrivateRoute>
        },
        {
          path : '/book-details/:id',
          element : <BookDetails/>
        },
        {
          path : '/edit-book/:id',
          element : <EditBook/>
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
       
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

export default routes