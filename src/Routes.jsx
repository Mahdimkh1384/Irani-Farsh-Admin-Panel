import Index from "./pages/Index/Index"
import Categories from "./pages/Categories/Categories"
import Comments from "./pages/Comments/Comments"
import Offs from "./pages/Offs/Offs"
import Products from "./pages/Products/Products"
import Users from "./pages/Users/Users"

const routes = [
    { path: "/", element: <Index /> },
    { path: "/categories", element: <Categories /> },
    { path: "/comments", element: <Comments /> },
    { path: "/offs", element: <Offs /> },
    { path: "/products", element: <Products /> },
    { path: "/users", element: <Users /> },
]

export default routes