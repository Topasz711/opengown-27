import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'งานจัดที่ไหน',
      answer: 'คณะแพทยศาสตร์วชิรพยาบาล มหาวิทยาลัยนวมินทราธิราช'
    },
    {
      question: 'ค่ายจัดวันไหนบ้าง ?',
      answer: 'วันที่ 6-8 พฤศจิกายน 2569'
    },
    {
      question: 'มีค่าใช้จ่ายเท่าไหร่ ?',
      answer: 'ค่าสมัครเข้าร่วมโครงการ 80 บาท ค่ายืนยันสิทธิ์ 799 บาท (ชำระหลังประกาศผล)'
    },
    {
      question: 'เอกสารที่ต้องใช้ในการสมัครมีอะไรบ้าง ?',
      answer: 'เอกสารที่ต้องใช้ ได้แก่\n1)  สำเนาบัตรประชาชนหรือบัตรนักเรียนของผู้สมัคร พร้อมลงชื่อรับรองสำเนาถูกต้อง และเขียนกำกับว่า "เอกสารฉบับนี้ใช้สำหรับการเข้าค่ายเปิดเสื้อกาวน์ ครั้งที่ 27 เท่านั้น"\n2)  คำรับรองการเป็นนักเรียนชั้นมัธยมศึกษาตอนปลาย (ปพ.7)\n3)  เอกสารยินยอมจากผู้ปกครอง (สามารถดาวน์โหลดได้ในแบบฟอร์มรับสมัคร)'
    },
    {
      question: 'ใครสามารถสมัครได้บ้าง ? เด็กซิ่วสมัครได้ไหม ?',
      answer: 'นักเรียนชั้นมัธยมศึกษาปีที่ 4-6 ในปีการศึกษา 2569 เท่านั้น'
    },
    {
      question: 'จะได้เกียรติบัตรมั้ย ?',
      answer: 'ได้ค่ะ (ต้องมาอย่างน้อย 2 วันเต็มจาก 3 วันจึงจะได้รับเกียรติบัตร)'
    },
    {
      question: 'รับผู้เข้าร่วมทั้งหมดกี่คน',
      answer: '130 คนโดยประมาณ'
    },
    {
      question: 'ต้องค้างคืนไหม ?',
      answer: 'ค่ายไป-กลับ 3 วัน ไม่ต้องค้างคืนค่ะ'
    },
    {
      question: 'สายศิลป์สมัครได้ไหม',
      answer: 'ได้ค่ะ'
    }
  ]

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-color-light to-white">
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
