/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Menu,
  Clock,
  X,
  Zap,
  Check,
  Award,
  Building2,
  Cpu,
  Bot,
  Eye,
  FileText,
  Shield,
  Gavel,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <div className="bg-bg text-ink font-sans selection:bg-gold selection:text-white">
      {/* Header / Navigation */}
      <header className="fixed w-full z-50 bg-bg/90 backdrop-blur-md border-b border-[#EAEAEA]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-lg text-white font-bold">L</div>
            <span className="font-bold text-xl tracking-tight text-navy font-serif">NGUYỄN VĂN LUẬT</span>
          </div>
          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#about" className="text-[11px] uppercase tracking-[2px] font-semibold text-ink hover:text-gold transition pt-2">Về Chuyên Gia</a>
            <a href="#quality" className="text-[11px] uppercase tracking-[2px] font-semibold text-ink hover:text-gold transition pt-2">AI Quality</a>
            <a href="#legal" className="text-[11px] uppercase tracking-[2px] font-semibold text-ink hover:text-gold transition pt-2">AI Legal</a>
            <a href="#register" className="bg-navy text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition text-[11px] uppercase tracking-[1px] font-semibold">Đăng ký ngay</a>
          </nav>
          <button className="md:hidden text-2xl text-navy"><Menu /></button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20 text-white overflow-hidden relative border-b border-white/10">
        <div className="absolute bottom-[-40px] right-[20px] font-serif text-[180px] opacity-10 pointer-events-none leading-none">2025</div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 space-y-6">
            <span className="text-[11px] uppercase tracking-[2px] font-semibold text-gold block">
              Masterclass Series
            </span>
            <h1 className="text-5xl md:text-7xl leading-tight font-serif font-bold">Nhân Bản<br/>Năng Lực AI<br/>Quản Trị 4.0</h1>
            <div className="w-[60px] h-[4px] bg-gold mb-[30px]"></div>
            <p className="text-lg text-white/80 max-w-lg font-light leading-relaxed">
              Kinh nghiệm +15 năm thực chiến quản lý dự án xây dựng.Làm chủ AI Quality và AI Legal để dẫn đầu cùng chuyên gia <strong>Nguyễn Văn Luật</strong>.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#register" className="bg-gold text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition text-[12px] uppercase tracking-[1px]">
                Đăng ký ngay
              </a>
              <a href="#quality" className="border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition text-[12px] uppercase tracking-[1px]">
                Khám phá lộ trình
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/20">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200" alt="Kỹ sư xây dựng sử dụng công nghệ" className="w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold p-6 rounded-[16px] shadow-xl z-20">
              <p className="text-4xl font-serif font-bold text-white">80%</p>
              <p className="text-[11px] uppercase tracking-[1px] text-white/90 font-semibold mt-1">Tiết kiệm thời gian</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-24 bg-bg" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-navy font-serif font-bold">Dịch chuyển từ Hard Work sang Smart System</h2>
            <div className="w-[60px] h-[4px] bg-gold mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[24px] bg-white border border-[#EAEAEA] shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-3 text-ink">
                <Clock className="text-ink/50" /> Mô Hình Cũ
              </h3>
              <ul className="space-y-6 text-ink/70">
                <li className="flex items-start gap-4"><X className="text-[#E74C3C] shrink-0" /> Xử lý hồ sơ QA/QC thủ công hàng giờ mỗi ngày.</li>
                <li className="flex items-start gap-4"><X className="text-[#E74C3C] shrink-0" /> Rủi ro pháp lý tiềm ẩn do rà soát sót điều khoản.</li>
                <li className="flex items-start gap-4"><X className="text-[#E74C3C] shrink-0" /> Kinh nghiệm chỉ nằm trong đầu cá nhân, khó kế thừa.</li>
              </ul>
            </div>
            <div className="p-10 rounded-[24px] bg-navy text-white shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-3">
                <Zap className="text-gold" /> Kỷ Nguyên Nhân Bản AI
              </h3>
              <ul className="space-y-6 text-white/80">
                <li className="flex items-start gap-4"><Check className="text-gold shrink-0" /> AI Playbook, AI playbot hoàn thành báo cáo trong vài phút.</li>
                <li className="flex items-start gap-4"><Check className="text-gold shrink-0" /> Hệ thống "Lớp giáp pháp lý" cảnh báo rủi ro 24/7.</li>
                <li className="flex items-start gap-4"><Check className="text-gold shrink-0" /> Đóng gói tri thức chuyên gia thành tài sản doanh nghiệp.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Bio Section */}
      <section className="py-24 bg-white border-y border-[#EAEAEA]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-2/5">
            <div className="relative group p-4">
              <div className="absolute inset-0 bg-gold rounded-[24px] rotate-3 group-hover:rotate-6 transition-transform"></div>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Nguyễn Văn Luật" className="relative z-10 rounded-[20px] grayscale hover:grayscale-0 transition duration-700 shadow-xl border border-white" />
            </div>
          </div>
          <div className="md:w-3/5 space-y-6">
            <h2 className="text-3xl md:text-5xl text-navy font-serif font-bold">Chuyên Gia Dẫn Dắt</h2>
            <div className="inline-block px-4 py-2 bg-navy/5 text-navy rounded-lg font-semibold text-[11px] uppercase tracking-[1px]">Mr. NGUYỄN VĂN LUẬT</div>
            <p className="text-xl leading-relaxed text-ink/70 font-serif italic border-l-2 border-gold pl-6 py-2 my-8">
              "AI không thay thế kỹ sư, nhưng kỹ sư giỏi dùng AI sẽ thay thế những người còn lại."
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-[16px]">
                <Award className="text-gold h-6 w-6 shrink-0" />
                <span className="font-medium text-ink">Kỹ sư Xây dựng kinh nghiệm quản lý dự án 15+ năm thực chiến</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-[16px]">
                <Building2 className="text-gold h-6 w-6 shrink-0" />
                <span className="font-medium text-ink">CEO Phố Xanh </span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-[16px]">
                <Cpu className="text-gold h-6 w-6 shrink-0" />
                <span className="font-medium text-ink">Tiên phong ứng dụng AI Playbook và AI playbot </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Course Topics */}
      <section className="py-24 bg-bg" id="quality">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-navy font-serif font-bold mb-6">Hai Trụ Cột Đào Tạo</h2>
            <p className="text-ink/60 font-light text-lg">Thiết kế lộ trình từ tư duy đến công cụ</p>
          </div>

          {/* AI Quality */}
          <div className="mb-24">
            <div className="flex items-center gap-6 mb-12">
              <span className="w-14 h-14 bg-navy text-white flex items-center justify-center rounded-2xl text-xl font-serif font-bold shadow-lg">01</span>
              <h3 className="text-3xl md:text-4xl text-navy font-serif font-bold">AI Quality – Đột Phá QA/QC</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-white border border-[#EAEAEA] rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300">
                <div className="w-16 h-16 bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl flex items-center justify-center mb-6 text-gold">
                  <Bot className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-serif font-bold mb-4 text-ink"> PLAYBOT</h4>
                <p className="text-ink/70 leading-relaxed font-light">Xây dựng AI giao tiếp như kỹ sư xây dựng chuyên ngành.</p>
              </div>
              <div className="p-8 bg-white border border-[#EAEAEA] rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300">
                <div className="w-16 h-16 bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl flex items-center justify-center mb-6 text-gold">
                  <Eye className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-serif font-bold mb-4 text-ink">PLAYBOOK </h4>
                <p className="text-ink/70 leading-relaxed font-light"> Xây dựng qui trình, biện pháp và biểu mẫu .</p>
              </div>
              <div className="p-8 bg-white border border-[#EAEAEA] rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300">
                <div className="w-16 h-16 bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl flex items-center justify-center mb-6 text-gold">
                  <FileText className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-serif font-bold mb-4 text-ink"> Kỹ Năng AI  </h4>
                <p className="text-ink/70 leading-relaxed font-light"> Nâng cao kỹ năng ứng dụng AI dành cho kỹ sư xây dựng.</p>
              </div>
            </div>
          </div>

          {/* AI Legal */}
          <div id="legal">
            <div className="flex items-center gap-6 mb-12">
              <span className="w-14 h-14 bg-gold text-white flex items-center justify-center rounded-2xl text-xl font-serif font-bold shadow-lg">02</span>
              <h3 className="text-3xl md:text-4xl text-navy font-serif font-bold">AI Legal – Lớp Giáp Pháp Lý</h3>
            </div>
            <div className="bg-navy rounded-[32px] p-10 md:p-16 text-white flex flex-col md:flex-row gap-16 items-center shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] font-serif text-[200px] opacity-10 pointer-events-none">AI</div>
              <div className="md:w-1/2 space-y-8 relative z-10">
                <h4 className="text-3xl font-bold font-serif leading-tight">Làm chủ Prompt5D & Nghị định 06/2021</h4>
                <p className="text-white/70 font-light leading-relaxed text-lg">Không còn lo lắng về sai lệch hồ sơ pháp lý. Học cách tích hợp toàn bộ hệ thống tiêu chuẩn quốc gia vào trợ lý ảo để rà soát 24/7.</p>
                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <Shield className="text-gold shrink-0 h-6 w-6" />
                    <div className="font-light text-white/90">Soát xét hợp đồng thầu, cung ứng tự động.</div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Gavel className="text-gold shrink-0 h-6 w-6" />
                    <div className="font-light text-white/90">Dự báo rủi ro tranh chấp dựa trên dữ liệu.</div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 overflow-hidden rounded-[24px] shadow-2xl z-10 border border-white/10">
                <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" alt="Pháp lý xây dựng" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-24 bg-white border-y border-[#EAEAEA]" id="register">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-navy rounded-[32px] p-10 md:p-16 text-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/10 text-8xl font-bold font-serif pointer-events-none">AI</div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-white font-serif font-bold mb-4">Đăng Ký Tư Vấn Lộ Trình</h2>
                <p className="text-white/70 font-light">Nhận tài liệu "Top 50 Prompts cho Kỹ sư Xây dựng" sau khi đăng ký</p>
                <div className="w-[40px] h-[3px] bg-gold mx-auto mt-6"></div>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[1px] font-semibold text-white/80">Họ và tên</label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-5 py-4 rounded-[12px] bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-gold transition font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[1px] font-semibold text-white/80">Số điện thoại</label>
                  <input type="tel" placeholder="090x xxx xxx" className="w-full px-5 py-4 rounded-[12px] bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-gold transition font-light" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] uppercase tracking-[1px] font-semibold text-white/80">Vị trí công tác</label>
                  <select className="w-full px-5 py-4 rounded-[12px] bg-white/5 border border-white/20 text-white focus:outline-none focus:border-gold transition font-light appearance-none">
                    <option className="text-ink">Chủ đầu tư / BQLDA</option>
                    <option className="text-ink">Chỉ huy trưởng / Kỹ sư hiện trường</option>
                    <option className="text-ink">QS / Pháp chế</option>
                    <option className="text-ink">Lãnh đạo doanh nghiệp</option>
                  </select>
                </div>
                <button type="submit" className="md:col-span-2 bg-gold text-white py-4 rounded-[12px] font-bold text-sm tracking-[1px] uppercase hover:bg-opacity-90 transition mt-4">
                  NHẬN TƯ VẤN NGAY
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg border-t border-[#EAEAEA]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="font-bold text-xl mb-2 text-navy font-serif">NGUYỄN VĂN LUẬT</div>
              <p className="text-ink/50 text-sm font-light">Chuyên gia Quản lý Dự án & AI Xây dựng</p>
            </div>
            <div className="flex gap-6 text-xl text-ink/30">
              <a href="#" className="hover:text-gold transition"><Facebook /></a>
              <a href="#" className="hover:text-gold transition"><Linkedin /></a>
              <a href="#" className="hover:text-gold transition"><Youtube /></a>
            </div>
            <div className="text-ink/40 text-xs font-light tracking-wide">
              © 2025 AI Construction Masterclass<br className="md:hidden" /> All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
