import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import { Home } from "./views/home";
import { Navbar } from "./component/navbar";
import { DetailView } from "./views/DetailView.js";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/planets"
              element={<DetailView title="Planets" type="planets" />}
            />
            <Route
              path="/people"
              element={<DetailView title="People" type="people" />}
            />
            <Route
              path="/starships"
              element={<DetailView title="Starships" type="starships" />}
            />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);