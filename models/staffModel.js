const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    maNhanVien: { type: String, required: true, unique: true }, // Mã nhân viên
    ho: { type: String, required: true }, // Họ nhân viên
    email: { type: String, default: "" }, // Email nhân viên
    phanLoaiCongTy: { type: String, default: "" }, // Phân loại công ty
    congTy: { type: String, default: "" }, // Tên công ty
    donVi: { type: String, default: "" }, // Đơn vị
    phongBan: { type: String, default: "" }, // Phòng ban
    toNhom: { type: String, default: "" }, // Tổ nhóm
    capBoSung1: { type: String, default: "" }, // Cấp bổ sung 1
    capBoSung2: { type: String, default: "" }, // Cấp bổ sung 2
    hlevel1Name: { type: String, default: "" }, // HLevel1 Name (cấp quản lý 1)
    emailCapPheDuyet: { type: String, default: "" }, // Email cấp phê duyệt
    caLamViecGanNhat: { type: String, default: "" }, // Ca làm việc gần nhất

    // Thông tin đăng ký ca trực hoặc chế độ
    dangKyCaTrucHoacCheDo: { type: String, default: "" },

    caLamViecThuong: {
      thang1: { type: String, default: "" },
      thang2: { type: String, default: "" },
      thang3: { type: String, default: "" },
    },

    caLamViecConNho: {
      thang1: { type: String, default: "" },
      thang2: { type: String, default: "" },
      thang3: { type: String, default: "" },
    },

    sauCheDoConNho: { type: String, default: "" },

    caThuong: {
      IT: { type: String, default: "" },
      KT: { type: String, default: "" },
    },

    caTruc: {
      IT: {
        thang1: {
          t2: { type: String, default: "" },
          t3: { type: String, default: "" },
          t4: { type: String, default: "" },
          t5: { type: String, default: "" },
          t6: { type: String, default: "" },
        },
        thang2: {
          t2: { type: String, default: "" },
          t3: { type: String, default: "" },
          t4: { type: String, default: "" },
          t5: { type: String, default: "" },
          t6: { type: String, default: "" },
        },
        thang3: {
          t2: { type: String, default: "" },
          t3: { type: String, default: "" },
          t4: { type: String, default: "" },
          t5: { type: String, default: "" },
          t6: { type: String, default: "" },
        },
      },
      KT: {
        thang1: {
          t2: { type: String, default: "" },
          t3: { type: String, default: "" },
          t4: { type: String, default: "" },
          t5: { type: String, default: "" },
          t6: { type: String, default: "" },
        },
        thang2: {
          t2: { type: String, default: "" },
          t3: { type: String, default: "" },
          t4: { type: String, default: "" },
          t5: { type: String, default: "" },
          t6: { type: String, default: "" },
        },
        thang3: {
          t2: { type: String, default: "" },
          t3: { type: String, default: "" },
          t4: { type: String, default: "" },
          t5: { type: String, default: "" },
          t6: { type: String, default: "" },
        },
      },
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    versionKey: false,
  }
);

module.exports = mongoose.model("test", staffSchema);
