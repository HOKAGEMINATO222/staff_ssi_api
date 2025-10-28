const Staff = require("../models/staffModel");

// 🟢 Thêm nhân viên
const addStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json({ message: "Thêm nhân viên thành công", staff });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Lỗi khi thêm nhân viên", error: error.message });
  }
};

// 🟡 Sửa thông tin nhân viên
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByIdAndUpdate(id, req.body, { new: true });
    if (!staff)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.status(200).json({ message: "Cập nhật thành công", staff });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật", error: error.message });
  }
};

// 🔴 Xóa nhân viên
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.status(200).json({ message: "Đã xóa nhân viên" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa", error: error.message });
  }
};

// 🔵 Lấy tất cả nhân viên
const getAllStaff = async (req, res) => {
  try {
    const staffs = await Staff.find().sort({ createdAt: -1 }); // sắp xếp mới nhất trước
    res.status(200).json({ count: staffs.length, staffs });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách nhân viên",
      error: error.message,
    });
  }
};

module.exports = { addStaff, updateStaff, deleteStaff, getAllStaff };
