import React from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";

import Authenticate from "pages/auth";
import Page404 from "pages/404";

const Router = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     navigate("/login");
  //   }, []);

  return (
    <Routes>
      <Route path="/" element={<Authenticate />} />
      {/* <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      /> */}
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Router;
