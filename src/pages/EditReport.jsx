import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState({ status: "", details: "" });

  useEffect(() => {
    fetch(`http://localhost:5000/api/reports/${id}`)
      .then((res) => res.json())
      .then((data) => setReport({ status: data.status, details: data.details }));
  }, [id]);

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/reports/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });

    navigate("/reports"); // กลับไปหน้ารายการหลังจากอัปเดตเสร็จ
  };

  return (
    <div>
      <h2>แก้ไขสถานะและรายละเอียด</h2>
      <label>สถานะ:</label>
      <select value={report.status} onChange={(e) => setReport({ ...report, status: e.target.value })}>
        <option value="รอซ่อม">รอซ่อม</option>
        <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
        <option value="ซ่อมเสร็จแล้ว">ซ่อมเสร็จแล้ว</option>
      </select>

      <label>รายละเอียด:</label>
      <textarea value={report.details} onChange={(e) => setReport({ ...report, details: e.target.value })} />

      <button onClick={handleSave}>บันทึก</button>
    </div>
  );
};

export default EditReport;
