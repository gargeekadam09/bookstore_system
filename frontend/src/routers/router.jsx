import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import ErrorPage from "../components/ErrorPage";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import OrdersPage from "../pages/books/OrdersPage";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
        {
            path :"/",
            element: <Home/>,

        },

        {
            path :"/orders",
            element: <PrivateRoute><OrdersPage/></PrivateRoute>
        },

         {
            path :"/about",
            element:<div>About</div>
        },

        {
          path : "/login",
          element: <Login/>
        },
        {
          path : "/register",
          element: <Register/>
        },
        {
          path: "*",
          element: <ErrorPage />
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path: "/admin/login",
          element: <AdminLogin/>
        },
        {
          path: "/admin/dashboard",
          element: <AdminDashboard/>
        }
    ]
  },

]);

export default router;
