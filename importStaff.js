require("dotenv").config();
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const connectDB = require("./config/db");
const Staff = require("./models/staffModel");

async function importExcel() {
  try {
    await connectDB();

    // Đọc file Excel
    const workbook = XLSX.readFile("./test.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log(`📥 Đọc được ${rows.length} dòng từ Excel`);

    // Chuyển dữ liệu từ Excel sang object để lưu vào MongoDB
    const staffDocs = rows
      .filter((r) => r["Mã Nhân Viên"]) // bỏ dòng trống
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

    // 🗑️ Xóa toàn bộ dữ liệu cũ trong collection
    const deleted = await Staff.deleteMany({});
    console.log(`🗑️ Đã xóa ${deleted.deletedCount} bản ghi cũ trong MongoDB`);

    // 📥 Thêm mới toàn bộ dữ liệu
    const inserted = await Staff.insertMany(staffDocs);
    console.log(`✅ Đã import thành công ${inserted.length} bản ghi mới`);
  } catch (error) {
    console.error("❌ Lỗi import:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

importExcel();
