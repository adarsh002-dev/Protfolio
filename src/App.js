import React from "react";
import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Prompts from "./pages/Prompts";
import PromptDetail from "./pages/PromptDetail";
import NotFound from "./pages/NotFound";

const App = () => (
  <MotionConfig reducedMotion="user">
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="prompts" element={<Prompts />} />
        <Route path="prompts/:slug" element={<PromptDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </MotionConfig>
);

export default App;
