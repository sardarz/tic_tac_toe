import "./App.css";
import "./main.css"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Game from "./Game";
import Menu from "./Menu";
import SharedLayout from "./SharedLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SharedLayout />}>
      <Route index element={<Menu />} />
      <Route path="/game" element={<Game />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
