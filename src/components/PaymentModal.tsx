import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="bg-white rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] w-full max-w-md relative z-10 overflow-hidden border border-[#EAEAEA]">
        {/* Header */}
        <div className="bg-white text-ink px-[30px] py-[20px] flex justify-between items-center border-b border-[#F0F0F0]">
          <h2 className="font-serif font-bold text-xl text-navy">Thanh toán Masterclass</h2>
          <button onClick={handleClose} className="text-[#888] hover:text-ink transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <div className="p-[30px] bg-[#FAFAFA]">
            <div className="mb-6">
              <h3 className="text-xl font-bold font-serif text-ink mb-2">Khóa học Quản Trị Xây Dựng 4.0</h3>
              <p className="text-sm text-ink/60 font-light">Gói thực chiến AI Agents & AI Legal</p>
            </div>

            <div className="bg-white rounded-[16px] p-5 border border-[#EAEAEA] mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-ink/60 text-sm">Giá gốc:</span>
                <span className="line-through text-ink/40 font-medium">10.000.000đ</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-ink/60 text-sm">Mã ưu đãi AI:</span>
                <span className="text-green-600 font-medium">-50%</span>
              </div>
              <div className="border-t border-[#F0F0F0] mt-4 pt-4 flex justify-between items-center font-bold">
                <span className="text-ink text-sm">Tổng cộng:</span>
                <span className="text-2xl font-serif text-navy">5.000.000đ</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <label className="flex items-center gap-4 p-4 border border-gold bg-white rounded-[16px] cursor-pointer shadow-[0_4px_12px_rgba(197,160,89,0.1)] transition">
                <input type="radio" name="payment" className="text-gold focus:ring-gold w-4 h-4" defaultChecked />
                <div className="flex-1">
                  <p className="font-semibold text-ink text-[14px]">Chuyển khoản ngân hàng (QR Pay)</p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border border-[#EAEAEA] bg-white rounded-[16px] cursor-pointer hover:border-[#CCC] transition opacity-50">
                <input type="radio" name="payment" className="text-gold focus:ring-gold w-4 h-4" disabled />
                <div className="flex-1">
                  <p className="font-medium text-ink text-[14px]">Thẻ tín dụng / Ghi nợ (Đang bảo trì)</p>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs text-ink/50 mb-6 justify-center">
              <ShieldCheck className="w-5 h-5 text-green-500" /> Thanh toán bảo mật 100%
            </div>

            <button 
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full bg-gold text-white py-4 rounded-[12px] font-bold tracking-[1px] text-[13px] uppercase hover:bg-opacity-90 transition flex items-center justify-center gap-2 shadow-md"
            >
              {isProcessing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Đang xử lý...</>
              ) : (
                'XÁC NHẬN THANH TOÁN'
              )}
            </button>
          </div>
        ) : (
          <div className="p-[40px] text-center flex flex-col items-center bg-[#FAFAFA]">
            <div className="w-[80px] h-[80px] bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
              <CheckCircle2 className="w-[40px] h-[40px]" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-navy mb-4">Đăng Ký Thành Công!</h3>
            <p className="text-ink/60 mb-10 leading-relaxed font-light">
              Chào mừng bạn đến với kỷ nguyên AI trong quản trị xây dựng. Hệ thống đã gửi email xác nhận và tài khoản đăng nhập cho bạn.
            </p>
            <button 
              onClick={handleClose}
              className="w-full bg-navy text-white py-4 rounded-[12px] font-bold tracking-[1px] uppercase text-[13px] hover:bg-opacity-90 transition shadow-md"
            >
              HOÀN TẤT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
