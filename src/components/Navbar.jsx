import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // สร้าง state สำหรับรับค่าค้นหา
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`); // ไปที่หน้าค้นหา พร้อมส่งค่า query
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">ระบบแจ้งซ่อม</h1>
      
      {/* เมนูของ Navbar */}
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">หน้าแรก</Link></li>
        <li><Link to="/report" className="hover:underline">แจ้งซ่อม</Link></li>
        <li><Link to="/all-reports" className="hover:underline">รายการทั้งหมด</Link></li>
        <li><Link to="/in-progress" className="hover:underline">กำลังดำเนินการ</Link></li>
        <li><Link to="/pending" className="hover:underline">รอซ่อม</Link></li>
        <li><Link to="/completed" className="hover:underline">ซ่อมเสร็จแล้ว</Link></li>
      </ul>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-l bg-gray-800 text-white outline-none border border-gray-600"
        />
        <button 
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          ค้นหา
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
