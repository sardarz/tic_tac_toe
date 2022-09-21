import "./App.css";
import "./main.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Game from "./Game";
import Menu from "./Menu";
import SharedLayout from "./SharedLayout";
import { useState } from "react";
import PlayerContext from "./PlayerContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SharedLayout />}>
      <Route index element={<Menu />} />
      <Route path="/game" element={<Game />} />
    </Route>
  )
);

const App = () => {
  const [firstPlayerMark, setFirstPlayerMark] = useState("X");

  return (
    <PlayerContext.Provider value={{ firstPlayerMark, setFirstPlayerMark }}>
      <RouterProvider router={router} />;
    </PlayerContext.Provider>
  );
};

export default App;
