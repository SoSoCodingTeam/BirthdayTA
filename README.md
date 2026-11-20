# 🌲☕ Hướng dẫn tùy biến trang Chúc Mừng Sinh Nhật Tâm Anh
### Aesthetic Dalat Misty Mountains & Pine Forest 🌲✨

Trang web đã được đồng bộ toàn diện theo đúng phong cách **Đà Lạt mờ sương, đồi thông reo & dãy núi Lang Biang** mà bạn yêu thích:
- **Trang mở đầu dí dỏm**: *"Ủa? Ai cho hết sinh nhật!"* với hiệu ứng vầng sáng lung linh.
- **Trang chính mang vẻ đẹp thanh bình**: Phông nền dãy núi Lang Biang mờ sương, mặt trời tỏa vệt nắng mai, sương mù lững lờ trôi qua thung lũng, căn nhà gỗ homestay nhỏ nép mình trên sườn đồi và bạt ngàn rặng thông reo vi vu kéo dài xuyên suốt tới tận chân trang.

---

## 📂 Cấu trúc thư mục

```text
d:\SoSo\Birthday\TA\
│
├── index.html       # File HTML giao diện Storybook Đà Lạt mờ sương & đồi thông
├── style.css        # Toàn bộ phong cách thiết kế núi mờ sương, đồi thông & tone màu phim analog
├── script.js        # Nhạc acoustic lofi, sương mờ bay, bụi thông lấp lánh & lightbox ảnh
├── README.md        # Hướng dẫn này
└── images/          # Thư mục để bạn bỏ ảnh thật của Tâm Anh vào
```

---

## 🛠️ Cách thay đổi hình ảnh & video của bạn

### 1. Thay ảnh kỷ niệm (Polaroid Moodboard)
1. Bỏ ảnh của bạn vào thư mục `images/` (ví dụ `photo1.jpg`, `photo2.jpg`, ...).
2. Mở file `index.html`, tìm tới đoạn `<!-- Card 1 -->` và đổi thuộc tính `src` của thẻ `<img>`:

```html
<!-- Đổi thành ảnh của bạn: -->
<img src="images/photo1.jpg" alt="Ảnh Tâm Anh">
```
3. Bạn cũng có thể sửa dòng chữ ghi chú bên dưới ảnh:
```html
<div class="moodboard-caption">Nụ cười rạng rỡ của Tâm Anh ✨</div>
```

---

### 2. Thay video kỷ niệm
Trong file `index.html`, tìm đến phần `<!-- SECTION 1: THƯỚC PHIM KỶ NIỆM -->`:

- **Cách 1: Nếu dùng file video `.mp4` lưu trên máy:**
  Bỏ file video vào thư mục `d:\SoSo\Birthday\TA\` (ví dụ đặt tên `video_tamanh.mp4`) và sửa dòng `<source>`:
  ```html
  <video id="birthdayVideo" controls poster="images/photo1.jpg">
    <source src="video_tamanh.mp4" type="video/mp4">
  </video>
  ```

- **Cách 2: Nếu dùng video YouTube:**
  Thay toàn bộ thẻ `<video>...</video>` bằng mã nhúng iframe của YouTube:
  ```html
  <div class="cinema-video-wrapper">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/MÃ_VIDEO_CỦA_BẠN" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  ```

---

### 3. Đổi nhạc nền chill
Trong file `index.html`, tại thẻ `<audio id="bgAudio">`:
Bạn có thể thay link nhạc lofi/acoustic khác hoặc để một file `nhac.mp3` vào thư mục:
```html
<audio id="bgAudio" loop preload="auto">
  <source src="nhac_dalat.mp3" type="audio/mpeg">
</audio>
```

---

## 🚀 Cách mở xem trang web
Chỉ cần **nhấp đúp chuột vào file `index.html`** để mở ngay trên trình duyệt (Chrome, Edge, Safari,...).
Trang đã được tối ưu hiển thị mượt mà trên cả máy tính lẫn điện thoại di động!
