import React, { useState } from "react";
import axios from "axios";

const ReportForm = () => {
  // ✅ ตรวจสอบให้แน่ใจว่า state ถูกต้อง
  const [formData, setFormData] = useState({
    name: "",
    parcelNumber: "",
    office: "",
    phone: "",
    issue: "",
    details: "",
  });

  // ✅ ฟังก์ชัน handleChange อัปเดต state เมื่อพิมพ์ข้อมูล
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ ฟังก์ชันส่งข้อมูลไปยัง backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("ส่งข้อมูล:", formData); // ✅ Debug ตรวจสอบค่า formData
      await axios.post("http://localhost:5000/api/reports", formData);
      alert("แจ้งซ่อมเรียบร้อย!");
      setFormData({
        name: "",
        parcelnumber: "",
        office: "",
        phone: "",
        issue: "",
        details: "",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("เกิดข้อผิดพลาด!");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">แจ้งซ่อม</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
          type="text"
          name="name"
          placeholder="ชื่อผู้แจ้ง"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="parcelNumber"
          placeholder="เลขครุภัณฑ์"
          className="w-full p-2 border rounded"
          value={formData.parcelnumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="office"
          placeholder="สำนัก/กอง"
          className="w-full p-2 border rounded"
          value={formData.office}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="เบอร์โทร"
          className="w-full p-2 border rounded"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="issue"
          placeholder="ปัญหาที่พบ"
          className="w-full p-2 border rounded"
          value={formData.issue}
          onChange={handleChange}
        />
        <textarea
          name="details"
          placeholder="รายละเอียด"
          className="w-full p-2 border rounded"
          value={formData.details}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ส่งข้อมูล</button>
      </form>
    </div>
  );
};

export default ReportForm;
