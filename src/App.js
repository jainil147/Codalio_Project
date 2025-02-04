import React from "react";
import "./styles.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import AccountBox from "./components/accountBox/index";
import { Dashboard } from "./components/dashbaord"; 
import PrivateRoute from "./components/Auth/PrivateRoute";
import LandingPage from "./components/LandingPage";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <Router>
      <Routes>
      <Route path = "/" element ={ <LandingPage />} />
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path = "/signup" element ={<AppContainer> <AccountBox /> </AppContainer>} />
      </Routes>

    </Router>
  );
}
