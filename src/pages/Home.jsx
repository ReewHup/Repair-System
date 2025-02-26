import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center p-6">
      <h1 className="text-3xl font-bold mb-4">ระบบแจ้งซ่อมออนไลน์</h1>
      <p className="text-gray-600 mb-6">เลือกเมนูที่ต้องการ:</p>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/report" className="bg-blue-500 text-white py-3 rounded shadow hover:bg-blue-600 transition">
          แจ้งซ่อม
        </Link>
        <Link to="/all-reports" className="bg-gray-500 text-white py-3 rounded shadow hover:bg-gray-600 transition">
          รายการแจ้งซ่อม
        </Link>
        <Link to="/in-progress" className="bg-yellow-500 text-white py-3 rounded shadow hover:bg-yellow-600 transition">
          กำลังดำเนินการ
        </Link>
        <Link to="/pending" className="bg-red-500 text-white py-3 rounded shadow hover:bg-red-600 transition">
          รอซ่อม
        </Link>
        <Link to="/completed" className="bg-green-500 text-white py-3 rounded shadow hover:bg-green-600 transition">
          ซ่อมเสร็จแล้ว
        </Link>
      </div>
    </div>
  );
};

export default Home;