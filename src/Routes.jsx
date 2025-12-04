import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index/Index";
import Categories from "./pages/Categories/Categories";
import Comments from "./pages/Comments/Comments";
import Offs from "./pages/Offs/Offs";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Index /> },
      { path: "/categories", element: <Categories /> },
      { path: "/comments", element: <Comments /> },
      { path: "/offs", element: <Offs /> },
      { path: "/products", element: <Products /> },
      { path: "/users", element: <Users /> },
    ]
  },
  { path: "/login", element: <Login /> }
];

export default routes;
