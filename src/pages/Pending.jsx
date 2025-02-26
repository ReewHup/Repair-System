import React, { useEffect, useState } from "react";
import axios from "axios";

const Pending = () => {
  const [reports, setReports] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then((res) => {
        console.log("API Response:", res.data); // ✅ ดูข้อมูล API ที่ส่งมา
        if (Array.isArray(res.data)) {
          setReports(res.data);
        } else {
          console.error("Data from API is not an array:", res.data);
          setReports([]); // ถ้าไม่ใช่อาร์เรย์ให้กำหนดเป็น []
        }
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
        setReports([]); // ป้องกัน error ถ้า fetch ไม่สำเร็จ
      });
  }, []);
  
    // ✅ กรองเฉพาะรายการที่มีสถานะ "รอซ่อม"
    const pendingReports = Array.isArray(reports) ? reports.filter((item) => item.status === "รอซ่อม") : [];
    console.log("Pending Reports:", pendingReports); // ✅ ตรวจสอบข้อมูลที่ถูกกรอง

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-red-500">รายการที่รอซ่อม</h2>

      {pendingReports.length > 0 ? (
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ชื่อ</th>
              <th className="p-2">เลขครุภัณฑ์</th>
              <th className="p-2">สำนัก/กอง</th>
              <th className="p-2">เบอร์โทร</th>
              <th className="p-2">สถานะ</th>
              <th className="p-2">ปัญหา</th>
              <th className="p-2">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {pendingReports.map((report) => (
              <tr key={report.id} className="border-t text-center">
                <td className="p-2">{report.name}</td>
                <td className="p-2">{report.parcelnumber}</td>
                <td className="p-2">{report.office}</td>
                <td className="p-2">{report.phone}</td>
                <td className="p-2 text-red-500">{report.status}</td>
                <td className="p-2">{report.issue}</td>
                <td className="p-2">{report.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">ไม่มีรายการรอซ่อม</p>
      )}
    </div>
  );
};

export default Pending;
