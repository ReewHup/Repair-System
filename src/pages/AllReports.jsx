import React, { useEffect, useState } from "react"; // ✅ Import ให้ถูกต้อง
import axios from "axios";

const AllReports = () => {
  const [reports, setReports] = useState([]);

  // ดึงข้อมูลจาก Backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

    return (
      <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">รายการแจ้งซ่อมทั้งหมด</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-center">
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
            {reports.map((report) => (
              <tr key={report.id} className="border-t text-center">
                <td className="p-2">{report.name}</td>
                <td className="p-2">{report.parcelnumber}</td>
                <td className="p-2">{report.office}</td>
                <td className="p-2">{report.phone}</td>
                <td
                className={`p-2 font-bold ${
                  report.status === "กำลังดำเนินการ"
                    ? "text-orange-500"
                    : report.status === "รอซ่อม"
                    ? "text-red-500"
                    : report.status === "ซ่อมเสร็จแล้ว"
                    ? "text-green-500"
                    : "text-gray-700"
                }`}
              >
                {report.status}
              </td>
                <td className="p-2">{report.issue}</td>
                <td className="p-2">{report.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AllReports;
  
  
