import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/home/home";
import { Board } from "../pages/board/board";

import { ROUTE_NAMES } from "./routeNames";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.HOME} element={<Home />} />
      <Route path={ROUTE_NAMES.BOARD} element={<Board />} />
    </Routes>
  );
};
