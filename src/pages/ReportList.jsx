import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleEditClick = (id) => {
  navigate(`/edit/${id}`); // ไปยังหน้าฟอร์มแก้ไข
};

// ในส่วนแสดงข้อมูล ให้เพิ่มปุ่มแก้ไข
<button onClick={() => handleEditClick(report.id)}>แก้ไข</button>
