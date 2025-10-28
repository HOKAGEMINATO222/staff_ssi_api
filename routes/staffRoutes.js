const express = require("express");
const XLSX = require("xlsx");
const Staff = require("../models/staffModel");
const router = express.Router();
const {
  addStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController");

// POST /api/staff  → thêm mới
router.post("/", addStaff);

// PUT /api/staff/:id → cập nhật
router.put("/:id", updateStaff);

// DELETE /api/staff/:id → xóa
router.delete("/:id", deleteStaff);

router.post("/import-excel", async (req, res) => {
  try {
    const { fileData, filename } = req.body;
    if (!fileData) return res.status(400).json({ message: "Thiếu fileData" });

    // Giải mã file Excel từ base64
    const buffer = Buffer.from(fileData, "base64");

    // Đọc file Excel
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);
    console.log(`📥 Đọc được ${rows.length} dòng từ ${filename || "Excel"}`);

    // 🗑️ Xóa dữ liệu cũ
    const deleted = await Staff.deleteMany({});
    console.log(`🗑️ Đã xóa ${deleted.deletedCount} bản ghi cũ`);

    // 🔄 Chuyển đổi dữ liệu
    const staffDocs = rows
      .filter((r) => r["Mã Nhân Viên"])
      .map((r) => ({
        maNhanVien: r["Mã Nhân Viên"].toString().trim(),
        ho: r["Họ"]?.trim() || "",
        email: r["Email"]?.trim() || "",
        phanLoaiCongTy: r["Phân loại công ty"]?.trim() || "",
        congTy: r["Công ty"]?.trim() || "",
        donVi: r["Đơn vị"]?.trim() || "",
        phongBan: r["Phòng ban"]?.trim() || "",
        toNhom: r["Tổ nhóm"]?.trim() || "",
        capBoSung1: r["Cấp bổ sung 1"]?.trim() || "",
        capBoSung2: r["Cấp bổ sung 2"]?.trim() || "",
        hlevel1Name: r["HLevel1 Name"]?.trim() || "",
        emailCapPheDuyet: r["Email cấp phê duyệt"]?.trim() || "",
        caLamViecGanNhat: r["Ca là việc gần nhất - 19/09/2025"]
          ? r["Ca là việc gần nhất - 19/09/2025"].toString().trim()
          : "",
      }));

    // 📥 Thêm mới
    const inserted = await Staff.insertMany(staffDocs);
    console.log(`✅ Import thành công ${inserted.length} bản ghi`);

    res.json({ success: true, count: inserted.length });
  } catch (error) {
    console.error("❌ Lỗi import:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
