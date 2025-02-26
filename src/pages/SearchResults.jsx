import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // ดึงค่าค้นหาจาก URL
  const [results, setResults] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ status: "", details: "" });

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:5000/api/reports/search?query=${query}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Error fetching search results:", err));
    }
  }, [query]);

  const handleEdit = (report) => {
    setEditingId(report._id);
    setEditData({ status: report.status, details: report.details });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/reports/${editingId}`, editData);
      setResults((prev) =>
        prev.map((item) =>
          item._id === editingId ? { ...item, ...editData } : item
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Error: ID is undefined");
      return;
    }

    if (window.confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
      try {
        await axios.delete(`http://localhost:5000/api/reports/${id}`);
        setResults((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Error deleting report:", err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🔍 ผลการค้นหา: "{query}"</h2>

      {results.length === 0 ? (
        <p className="text-center text-gray-600">❌ ไม่พบข้อมูลที่ตรงกับ "{query}"</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border p-2">ชื่อผู้แจ้ง</th>
              <th className="border p-2">เลขพัสดุ</th>
              <th className="border p-2">หน่วยงาน</th>
              <th className="border p-2">เบอร์โทร</th>
              <th className="border p-2">สถานะ</th>
              <th className="border p-2">รายละเอียด</th>
              <th className="border p-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {results.map((report) => (
              <tr key={report._id} className="border text-center">
                <td className="border p-2">{report.name}</td>
                <td className="border p-2">{report.parcelnumber}</td>
                <td className="border p-2">{report.office}</td>
                <td className="border p-2">{report.phone}</td>
                <td className="border p-2">
                  {editingId === report._id ? (
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="border p-1"
                    >
                      <option value="รอซ่อม">รอซ่อม</option>
                      <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                      <option value="ซ่อมเสร็จแล้ว">ซ่อมเสร็จแล้ว</option>
                    </select>
                  ) : (
                    report.status
                  )}
                </td>
                <td className="border p-2">
                  {editingId === report._id ? (
                    <input
                      type="text"
                      value={editData.details}
                      onChange={(e) => setEditData({ ...editData, details: e.target.value })}
                      className="border p-1 w-full"
                    />
                  ) : (
                    report.details
                  )}
                </td>
                <td className="border p-2 text-center space-x-2">
                  {editingId === report._id ? (
                    <button onClick={handleSave} className="bg-green-500 text-white p-1 rounded">
                      บันทึก
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(report)} className="bg-blue-500 text-white p-1 rounded">
                      แก้ไข
                    </button>
                  )}
                  <button onClick={() => handleDelete(report._id)} className="bg-red-500 text-white p-1 rounded">
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchResults;
