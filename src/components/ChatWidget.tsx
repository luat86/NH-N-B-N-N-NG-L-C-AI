import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, CreditCard, Loader2, Paperclip, File as FileIcon, Trash2 } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import Markdown from 'react-markdown';
import PaymentModal from './PaymentModal';
import { motion, AnimatePresence } from 'motion/react';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
Bạn là trợ lý AI ảo của Khóa học "Nhân Bản Năng Lực AI - Quản Trị Xây Dựng 4.0" do chuyên gia Nguyễn Văn Luật giảng dạy.
Nhiệm vụ của bạn là:
1. Trả lời các câu hỏi về khóa học. Khóa học có 2 trụ cột chính: AI Quality (Đột phá QA/QC bao gồm PLAYBOT giao tiếp chuyên ngành, PLAYBOOK xây dựng quy trình/biểu mẫu, và Kỹ Năng AI) và AI Legal (Lớp giáp pháp lý rà soát hợp đồng theo Nghị định 06/2021).
2. Thuyết phục khách hàng đăng ký khóa học. Giá khóa học đang được ưu đãi là 5.000.000 VNĐ.
3. Chuyên gia Nguyễn Văn Luật có hơn 15 năm kinh nghiệm quản lý dự án xây dựng, là CEO Phố Xanh.
4. Cơ sở tri thức: Khi học viên tải lên tài liệu đính kèm, hãy đọc, phân tích và đưa ra tư vấn dựa trên tài liệu đó hoặc chứng minh cách AI có thể tự động hóa xử lý những tài liệu.
5. Khi khách hàng có ý định đăng ký hoặc hỏi cách thanh toán, hãy cung cấp một đường dẫn thanh toán giả lập bằng markdown chính xác như sau: [THANH TOÁN NGAY](action:pay) để hệ thống hiển thị nút thanh toán cho khách hàng.
Luôn trả lời lịch sự, chuyên nghiệp, ngắn gọn và nhiệt tình. Giọng điệu tự tin, thực chiến.
`;

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachment?: { name: string; type: string };
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Chào bạn! Mình là trợ lý AI của Masterclass Quản Trị Xây Dựng 4.0. Mình đã được nạp tri thức chuyên ngành. Bạn có thể hỏi về khóa học hoặc thử tải lên một tài liệu để mình phân tích nhé!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const [attachment, setAttachment] = useState<{ name: string; type: string; base64: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file tối đa là 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const base64 = result.split(',')[1];
      setAttachment({
        name: file.name,
        type: file.type,
        base64
      });
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !attachment) return;

    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: input,
      attachment: attachment ? { name: attachment.name, type: attachment.type } : undefined
    };
    setMessages((prev) => [...prev, userMsg]);
    
    const currentInput = input;
    const currentAttachment = attachment;

    setInput('');
    setAttachment(null);
    setIsLoading(true);

    try {
      // Build conversation history for the model
      const chatContents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }] 
      }));
      
      const newParts: any[] = [];
      if (currentAttachment) {
        newParts.push({
          inlineData: {
            mimeType: currentAttachment.type,
            data: currentAttachment.base64
          }
        });
      }
      
      if (currentInput.trim()) {
        newParts.push({ text: currentInput });
      } else if (currentAttachment) {
        newParts.push({ text: `Tôi vừa gửi một tệp đính kèm tên là "${currentAttachment.name}". Bạn hãy phân tích tài liệu này nhé.` });
      }
      
      chatContents.push({ role: 'user', parts: newParts });

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: chatContents,
        config: {
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          }
        }
      });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'Xin lỗi, tôi không thể xử lý yêu cầu lúc này.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', content: 'Lỗi kết nối AI. Vui lòng kiểm tra lại.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Custom renderer for markdown links to catch the 'action:pay' link
  const renderMarkdownComponents = {
    a: ({ node, href, children, ...props }: any) => {
      if (href === 'action:pay') {
        return (
          <div className="bg-navy text-white p-[24px] rounded-[16px] mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="text-[11px] opacity-80 uppercase tracking-widest font-semibold mb-1">Phí ghi danh</div>
              <div className="text-[20px] font-bold font-serif">5.000.000 VNĐ</div>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-semibold uppercase text-[12px] tracking-[1px] hover:bg-opacity-90 transition border-none cursor-pointer w-full sm:w-auto"
            >
              {children}
            </button>
          </div>
        );
      }
      return <a href={href} className="text-gold underline hover:text-opacity-80" {...props}>{children}</a>;
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-[350px] sm:w-[450px] h-[600px] max-h-[85vh] bg-white rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] mb-4 flex flex-col overflow-hidden border border-[#EAEAEA] origin-bottom-right"
            >
              {/* Header */}
              <div className="bg-white text-ink px-[30px] py-[20px] flex justify-between items-center border-b border-[#F0F0F0]">
                <div className="flex items-center gap-[15px]">
                  <div className="w-[44px] h-[44px] rounded-[12px] bg-gold flex items-center justify-center font-bold text-white text-lg shadow-sm">L</div>
                  <div>
                    <h3 className="font-semibold text-[15px]">Hỗ trợ ghi danh tự động</h3>
                    <p className="text-[12px] text-[#888] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Trực tuyến (Phản hồi tức thì)
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-[#888] hover:text-ink transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-[30px] space-y-[20px] bg-[#FAFAFA]">
                {messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[18px] px-[20px] py-[16px] text-[14px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-navy text-white rounded-br-[4px] shadow-md'
                          : 'bg-white border border-[#EEE] text-ink rounded-bl-[4px] shadow-sm'
                      }`}
                    >
                      {msg.attachment && (
                        <div className={`flex items-center gap-2 mb-3 p-2 ${msg.role === 'user' ? 'bg-white/10' : 'bg-[#F0F0F0]'} rounded-lg text-xs`}>
                          <FileIcon className="w-4 h-4 shrink-0" />
                          <span className="truncate max-w-[200px] font-medium">{msg.attachment.name}</span>
                        </div>
                      )}
                      {msg.content && (
                        <div className="prose prose-sm max-w-none text-current">
                          <Markdown components={renderMarkdownComponents}>{msg.content}</Markdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white border border-[#EEE] text-ink rounded-[18px] rounded-bl-[4px] px-[20px] py-[16px] shadow-sm flex items-center gap-3 text-[14px]">
                      <Loader2 className="w-4 h-4 animate-spin text-gold" />
                      <span className="text-[#888]">AI đang phân tích...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="bg-white border-t border-[#F0F0F0]">
                <AnimatePresence>
                  {attachment && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-[20px] py-[10px] border-b border-[#F0F0F0] flex items-center justify-between bg-[#FAFAFA]"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                          <FileIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-ink/70 truncate font-medium">{attachment.name}</span>
                      </div>
                      <button onClick={() => setAttachment(null)} className="text-ink/40 hover:text-[#E74C3C] transition p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="px-[20px] py-[20px] flex items-end gap-3">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="application/pdf,image/*,text/plain" 
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-[46px] h-[46px] flex items-center justify-center text-[#888] hover:text-gold hover:bg-[#FAFAFA] rounded-[12px] transition shrink-0"
                    title="Đính kèm tài liệu"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi của bạn tại đây..."
                    className="flex-1 bg-white border border-[#DDD] rounded-[12px] px-[20px] py-[12px] text-[14px] focus:outline-none focus:border-gold resize-none overflow-hidden transition"
                    rows={1}
                    style={{ minHeight: '46px', maxHeight: '100px' }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={(!input.trim() && !attachment) || isLoading}
                    className="bg-navy text-white px-[24px] rounded-[12px] font-semibold text-[14px] flex items-center justify-center hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition h-[46px] shrink-0 shadow-md"
                  >
                    <Send className="w-4 h-4 sm:hidden" />
                    <span className="hidden sm:inline">Gửi</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[60px] h-[60px] bg-gold text-white rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.15)] relative z-20 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <MessageCircle className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <X className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {!isOpen && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </>
  );
}
