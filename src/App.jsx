import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReportForm from "./pages/ReportForm";
import AllReports from "./pages/AllReports";
import InProgress from "./pages/InProgress";
import Pending from "./pages/Pending";
import Completed from "./pages/Completed";
import SearchResults from "./pages/SearchResults";
import EditReport from "./pages/EditReport";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/all-reports" element={<AllReports />} />
          <Route path="/in-progress" element={<InProgress />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/edit/:id" element={<EditReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;