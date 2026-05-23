# SPLOCK 1.0 - Hướng Dẫn Build APK

## 📱 Yêu Cầu

1. **Node.js** (v14+): https://nodejs.org/
2. **Android Studio**: https://developer.android.com/studio
3. **Java JDK**: Cài sẵn trong Android Studio
4. **Git**: https://git-scm.com/

---

## 🚀 Bước 1: Chuẩn Bị Môi Trường

```bash
# Cài đặt Ionic CLI & Capacitor CLI
npm install -g @ionic/cli @capacitor/cli

# Clone repository
git clone https://github.com/tuongng200999-netizen/SPLOCK1.0.git
cd SPLOCK1.0

# Cài đặt dependencies
npm install
```

---

## 🔧 Bước 2: Build Web (Production)

```bash
# Build ứng dụng web
npm run build

# Kết quả sẽ trong thư mục: www/
```

---

## ⚙️ Bước 3: Thêm Platform Android

```bash
# Thêm Android platform
npm run cap:add:android

# Sync web files và Android project
npm run cap:sync
```

---

## 🛠️ Bước 4: Mở Android Studio

```bash
# Mở project trong Android Studio
npm run cap:open:android
```

**Hoặc thủ công:**
- Mở Android Studio
- File → Open → Chọn thư mục `android/` trong project

---

## 📦 Bước 5: Build APK

### Cách 1: Sử dụng Android Studio GUI
1. Chọn **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Chờ quá trình build hoàn tất
3. APK sẽ tại: `android/app/release/app-release.apk`

### Cách 2: Command Line
```bash
cd android
./gradlew assembleRelease
# Hoặc
./gradlew assembleDebug
```

**Kết quả:**
- Release: `android/app/release/app-release.apk`
- Debug: `android/app/debug/app-debug.apk`

---

## 📤 Bước 6: Cài Đặt trên Thiết Bị

### Cách 1: USB Debug
```bash
# Kết nối thiết bị via USB, bật USB Debug
adb install android/app/release/app-release.apk
```

### Cách 2: Thủ công
1. Chuyển file APK sang thiết bị
2. Mở Files → Cài đặt APK

---

## 🧪 Test Keys

Sử dụng các key này để kiểm tra:

| Key | Thời Hạn | Tác Dụng |
|-----|----------|----------|
| `SPLOCK1DAY` | 1 Ngày | Mở tất cả 20 tính năng |
| `SPLOCK30DAYS` | 30 Ngày | Mở tất cả 20 tính năng |
| `SPLOCK90DAYS` | 90 Ngày | Mở tất cả 20 tính năng |
| `SPLOCK180DAYS` | 180 Ngày | Mở tất cả 20 tính năng |
| `SPLOCKVINHVIEN` | Vĩnh Viễn | Mở tất cả 20 tính năng (không hạn) |

---

## 🐛 Troubleshooting

### Lỗi: "gradlew: command not found"
```bash
# Trên Linux/Mac
chmod +x android/gradlew

# Rồi thử lại
./gradlew assembleRelease
```

### Lỗi: "ANDROID_HOME not set"
```bash
# Set ANDROID_HOME
export ANDROID_HOME=/path/to/android/sdk
```

### Lỗi Build
1. Xóa cache: `rm -rf node_modules package-lock.json && npm install`
2. Clean build: `./gradlew clean` trong thư mục `android/`
3. Sync lại: `npm run cap:sync`

---

## 📝 Các File Quan Trọng

- `src/index.html` - Giao diện chính
- `src/styles.css` - Style luxury
- `src/app.js` - Logic ứng dụng
- `capacitor.config.ts` - Cấu hình Capacitor
- `android/app/build.gradle` - Gradle build config

---

## 🎉 Thành Công!

Nếu mọi thứ hoạt động bình thường:
- ✅ APK được tạo thành công
- ✅ Ứng dụng chạy trên thiết bị
- ✅ Có thể nhập key và bật tính năng

---

## 📞 Hỗ Trợ

Liên hệ: **Zalo 0354407521**

---

*SPLOCK 1.0 - Luxury Gaming App*
