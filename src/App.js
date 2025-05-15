import React from "react";
import InvestmentIndex from "./InvestmentIndex";
import InvestmentGraph from "./InvestmentGraph";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import TotalInvestment from "./TotalInvestment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<InvestmentIndex />}></Route>
          <Route path="/monthly" element={<InvestmentIndex />}></Route>
          <Route path="/total" element={<TotalInvestment />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
