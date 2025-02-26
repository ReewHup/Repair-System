import React, { useEffect, useState } from "react";
import axios from "axios";

const InProgress = () => {
    const [reports, setReports] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:5000/api/reports")
        .then((res) => {
          console.log("API Response:", res.data);
          if (Array.isArray(res.data)) {
            setReports(res.data);
          } else {
            console.error("Data from API is not an array:", res.data);
            setReports([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching reports:", err);
          setReports([]);
        });
    }, []);
  
    // ✅ กรองเฉพาะรายการที่มีสถานะ "กำลังดำเนินการ"
    const inProgressReports = Array.isArray(reports) ? reports.filter((item) => item.status === "กำลังดำเนินการ") : []

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-red-500">รายการที่กำลังดำเนินการ</h2>

      {inProgressReports.length > 0 ? (
        <table className="w-full border">
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
            {inProgressReports.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.parcelnumber}</td>
                <td className="p-2">{item.office}</td>
                <td className="p-2">{item.phone}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">{item.issue}</td>
                <td className="p-2">{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">ไม่มีรายการรอดำเนินการ</p>
      )}
    </div>
  );
};

export default InProgress;
