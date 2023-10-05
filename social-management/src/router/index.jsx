import React, { useEffect } from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";

import Authenticate from "pages/auth";
import Page404 from "pages/404";
import Home from "pages/home";
import Layout from "components/layout";
import Accounts from "pages/accounts";

const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedPhone = localStorage.getItem("phoneNumber");
    if (!storedPhone) {
      navigate("/auth");
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/accounts"
        element={
          <Layout>
            <Accounts />
          </Layout>
        }
      />

      <Route path="/auth" element={<Authenticate />} />
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
