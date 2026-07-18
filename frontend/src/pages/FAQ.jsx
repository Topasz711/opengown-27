import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'เด็กซิ่วสมัครได้ไหม?',
      answer: 'ได้ครับ! ค่าย Opengown Camp เปิดรับน้องๆ ที่กำลังศึกษาอยู่ในระดับชั้น ม.ปลาย หรือเทียบเท่า รวมถึงน้องๆ ที่กำลังเตรียมสอบเข้ามหาวิทยาลัย (เด็กซิ่ว) ก็สามารถสมัครได้เช่นกัน'
    },
    {
      question: 'สายศิลป์สมัครได้ไหม?',
      answer: 'ได้ครับ! ค่ายของเรายินดีต้อนรับน้องๆ ทุกแผนการเรียน ไม่ว่าจะเป็นสายวิทย์-คณิต สายศิลป์-คำนวณ หรือสายศิลป์-ภาษา เพราะเราเชื่อว่าทุกคนมีความสนใจในวิชาชีพแพทย์ได้ equally'
    },
    {
      question: 'ค่าใช้จ่ายเท่าไหร่?',
      answer: 'มีค่าใบสมัครค่าย 80 บาท และหากได้รับคัดเลือกเข้าค่าย จะมีค่ายืนยันสิทธิ์เข้าร่วมค่าย 700 บาท (ชำระเงินหลังประกาศผล)'
    },
    {
      question: 'รับสมัครกี่คน?',
      answer: 'ค่ายรับผู้เข้าร่วมจำนวน 100 คน โดยคัดเลือกจากใบสมัครและข้อสอบเรียงความ'
    },
    {
      question: 'ต้องพักที่โรงพยาบาลไหม?',
      answer: 'ไม่ได้มีที่พักให้ ค่ายนี้เป็นรูปแบบเดินทางไป-กลับ ผู้เข้าร่วมต้องเดินทางมาด้วยตนเอง'
    },
    {
      question: 'มีเสื้อผ้าให้ใส่ไหม?',
      answer: 'มีเสื้อสกรีน Opengown แจกให้ผู้เข้าร่วมคนละ 1 ตัว'
    },
    {
      question: 'ถ้าติดโควิดหรือป่วย จะทำอย่างไร?',
      answer: 'หากผู้เข้าร่วมมีอาการป่วยหรือติดเชื้อก่อนวันค่าย กรุณาแจ้งทีมงานทันที'
    },
    {
      question: 'ผู้ปกครองสามารถเข้ามาดูกิจกรรมได้ไหม?',
      answer: 'เนื่องจากพื้นที่ในโรงพยาบาลมีจำกัด และเพื่อความปลอดภัยของผู้เข้าร่วม กิจกรรมค่ายจึงเปิดเฉพาะผู้ที่ผ่านการคัดเลือกเท่านั้น ขออภัยที่ไม่สามารถอนุญาตให้ผู้ปกครองเข้าชมได้'
    },
    {
      question: 'ถ้าไม่ผ่านการคัดเลือก สามารถสมัครใหม่ได้ไหม?',
      answer: 'ได้ครับ! น้องๆ สามารถสมัครใหม่ในรุ่นถัดไปได้ เราขอให้กำลังใจและไม่ท้อแท้ เพราะการคัดเลือกมีจำนวนที่นั่งจำกัด'
    }
  ]

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          คำถามที่พบบ่อย (FAQ)
        </h1>
        <p className="text-center text-gray-600 mb-12">
          รวบรวมคำถามที่น้องๆ มักถามบ่อยๆ เกี่ยวกับค่าย Opengown Camp 27th
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ยังมีคำถามอื่นๆ?
            </h2>
            <p className="text-gray-600 mb-6">
              หากน้องๆ มีคำถามเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางต่างๆ
            </p>
            <a
              href="/contact"
              className="inline-block btn-primary"
            >
              ติดต่อเรา
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
