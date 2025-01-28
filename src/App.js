import React from "react";
import "./styles.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Ensure these imports
import AccountBox from "./components/accountBox/index";
import { Dashboard } from "./components/dashbaord"; // Replace with correct path

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: c cvbcvbenter;
`;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path = "/signup" element ={<AppContainer><AccountBox /> </AppContainer>} />
      </Routes>

    </Router>
  );
}
