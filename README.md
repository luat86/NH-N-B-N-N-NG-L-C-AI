# Nhân Bản Năng Lực AI - Quản Trị Xây Dựng 4.0

Dự án Landing page kèm AI Chat tư vấn tự động, khởi chạy bởi React và Vite.

## 🚀 Hướng Dẫn Triển Khai (Deployment)
Dự án này đã được cấu hình chuyên biệt để dễ dàng triển khai lên **GitHub Pages** và **Vercel**.

### Yêu Cầu Trước Khi Bắt Đầu
Bạn cần thiết lập khóa bảo mật API cho Gemini. Khi triển khai lên Vercel hoặc chạy dưới localhost, bạn nên thiết lập biến môi trường sau:
`GEMINI_API_KEY` = Khóa API của Google Gemini.

### 1. Triển Khai Lên Vercel (Khuyến nghị)
Vercel hỗ trợ dự án Vite React.js cực kỳ mượt mà. Mã nguồn đã có sẵn tệp `vercel.json` phục vụ việc route-rewrite chuyên nghiệp.
- **Bước 1**: Đẩy code dự án này lên một repository trên tài khoản GitHub của bạn.
- **Bước 2**: Đăng nhập vào [Vercel](https://vercel.com/) và kết nối tài khoản GitHub.
- **Bước 3**: Bấm **"Add New Project"** và import repository trên.
- **Bước 4**: Tại phần **Environment Variables**, thêm biến `GEMINI_API_KEY` điền Key của bạn làm Value. (Lưu ý: Không để khoảng trắng dư thừa ở biến).
- **Bước 5**: Bấm **Deploy**! Hệ thống Vercel sẽ tự động build và chạy nền cho bạn.

### 2. Triển Khai Lên GitHub Pages
Dự án đã có bản thiết lập CI/CD bằng luồng tự động biên dịch ở nhánh main qua tệp `.github/workflows/deploy.yml`. 
- Đẩy source code này lên một repository mới (Public) của GitHub.
- Vào mục **Settings** > **Pages** của repository, đổi Source thành **GitHub Actions**. Hệ thống sẽ tự động quét file yml có sẵn để deploy.
- *Lưu ý 1:* Với GitHub Pages, bạn không thể sử dụng file biến môi trường bảo mật server. Các calls của trình duyệt sẽ lấy Public Key. Nếu bạn muốn công khai Key này, bạn có thể thiết lập Github Secrets cho build bước build, hoặc an toàn nhất là làm Serverless api riêng biệt hoặc dùng Vercel có sẵn bảo mật môi trường.
- *Lưu ý 2:* Nếu app hiển thị trang trắng, là vì repo URL của bạn không nằm ở gốc "/". Hãy mở tệp `vite.config.ts`, thêm `base: '/Ten-Repository-Cua-Ban/',` để khớp với link GitHub page.

## Cài đặt cục bộ (Local Development)
1. Cài các gói (packages): `npm install` 
2. Đổi tên tệp `.env.example` thành `.env`, điền key Gemini của bạn.
3. Chạy lệnh: `npm run dev`
4. Dự án sẽ chạy tại `http://localhost:3000`
