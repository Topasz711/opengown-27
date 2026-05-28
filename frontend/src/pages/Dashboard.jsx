import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, FileText, Upload, CheckCircle, Clock, AlertCircle, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Mock application data
  const mockApplication = {
    id: 1,
    status: 'pending', // pending, under_review, accepted, rejected
    submittedAt: '2024-10-15',
    documents: {
      photo: false,
      consentForm: false
    }
  }

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      label: 'รอตรวจเอกสาร',
      message: 'ทีมงานกำลังตรวจสอบข้อมูลของคุณ'
    },
    under_review: {
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      label: 'กำลังพิจารณา',
      message: 'ใบสมัครของคุณอยู่ในขั้นตอนการพิจารณา'
    },
    accepted: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      label: 'ผ่านการคัดเลือก',
      message: 'ยินดีด้วย! คุณผ่านการคัดเลือกเข้าร่วมค่าย'
    },
    rejected: {
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      label: 'ไม่ผ่านการคัดเลือก',
      message: 'ขออภัย คุณไม่ผ่านการคัดเลือกรอบนี้'
    }
  }

  const currentStatus = statusConfig[mockApplication.status]
  const StatusIcon = currentStatus.icon

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Status Card */}
        <div className={`card ${currentStatus.bgColor} mb-8`}>
          <div className="flex items-center gap-4">
            <div className={`${currentStatus.color}`}>
              <StatusIcon size={48} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentStatus.label}</h2>
              <p className="text-gray-600">{currentStatus.message}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User size={24} />
              ข้อมูลส่วนตัว
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">ชื่อ-นามสกุล</label>
                <p className="text-gray-800">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'ยังไม่ได้ระบุ'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">อีเมล</label>
                <p className="text-gray-800">{user?.email || 'ยังไม่ได้ระบุ'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">โรงเรียน</label>
                <p className="text-gray-800">{user?.user_metadata?.school || 'ยังไม่ได้ระบุ'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">เบอร์โทรศัพท์</label>
                <p className="text-gray-800">{user?.user_metadata?.phone || 'ยังไม่ได้ระบุ'}</p>
              </div>
            </div>
          </div>

          {/* Document Status */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={24} />
              สถานะเอกสาร
            </h3>
            <div className="space-y-3">
              {[
                { key: 'photo', label: 'รูปถ่าย' },
                { key: 'consentForm', label: 'ใบขออนุญาตผู้ปกครอง' }
              ].map((doc) => (
                <div key={doc.key} className="flex items-center justify-between">
                  <span className="text-gray-700">{doc.label}</span>
                  {mockApplication.documents[doc.key] ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <AlertCircle size={20} className="text-orange-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="card mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Upload size={24} />
            อัปโหลดเอกสาร
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'photo', label: 'รูปถ่าย', accept: 'image/*' },
              { key: 'consentForm', label: 'ใบอนุญาต', accept: '.pdf,.jpg,.png' }
            ].map((doc) => (
              <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">{doc.label}</p>
                <input type="file" accept={doc.accept} className="hidden" />
                <button className="text-primary text-sm font-medium">เลือกไฟล์</button>
              </div>
            ))}
          </div>
        </div>

        {/* Essay Section */}
        <div className="card mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">ข้อสอบเรียงความ</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                คำถาม: ทำไมคุณถึงอยากเป็นแพทย์ และทำไมต้องวชิรพยาบาล?
              </label>
              <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="เขียนคำตอบของคุณที่นี่ (ไม่เกิน 500 คำ)"
                maxLength="500"
              />
              <p className="text-sm text-gray-500 text-right mt-1">0 / 500 คำ</p>
            </div>
            <button className="btn-primary">บันทึกคำตอบ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
