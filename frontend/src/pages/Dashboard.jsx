import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, FileText, Upload, CheckCircle, Clock, AlertCircle, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { applicationAPI } from '../services/api'

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  
  // State for essay and file uploads
  const [essay, setEssay] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [applicationData, setApplicationData] = useState(null)
  const [documents, setDocuments] = useState({
    photo: false,
    consentForm: false
  })
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
    
    // Fetch existing application data
    const fetchApplication = async () => {
      try {
        const data = await applicationAPI.get()
        if (data && data.length > 0) {
          const app = data[0]
          setApplicationData(app)
          setEssay(app.essay || '')
          setDocuments({
            photo: !!app.photo_url,
            consentForm: !!app.consent_form_url
          })
        }
      } catch (error) {
        console.error('Error fetching application:', error)
      }
    }
    
    fetchApplication()
  }, [isAuthenticated, navigate])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Handle essay save
  const handleSaveEssay = async () => {
    try {
      setIsSaving(true)
      
      if (applicationData) {
        // Update existing application
        await applicationAPI.update(applicationData.id, { essay })
      } else {
        // Create new application
        await applicationAPI.submit({ 
          user_id: user.id, 
          essay: essay 
        })
      }
      alert('บันทึกคำตอบเรียบร้อยแล้ว!')
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (docKey, file) => {
    if (!file) return
    
    try {
      const fileUrl = await applicationAPI.uploadDocument(user.id, file)
      
      // Determine which field to update based on docKey
      const updateField = docKey === 'photo' ? 'photo_url' : 'consent_form_url'
      
      if (applicationData) {
        await applicationAPI.update(applicationData.id, { [updateField]: fileUrl })
      } else {
        await applicationAPI.submit({ 
          user_id: user.id, 
          [updateField]: fileUrl 
        })
      }
      
      // Update local state
      setDocuments(prev => ({ ...prev, [docKey]: true }))
      alert(`อัปโหลด ${docKey === 'photo' ? 'รูปถ่าย' : 'ใบอนุญาต'} สำเร็จ!`)
    } catch (error) {
      alert('อัปโหลดไฟล์ไม่สำเร็จ: ' + error.message)
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

  // Use applicationData if available, otherwise use default pending status
  const currentApplication = applicationData || { status: 'pending' }
  const currentStatus = statusConfig[currentApplication.status]
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
                  {documents[doc.key] ? (
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
              <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">{doc.label}</p>
                <input 
                  type="file" 
                  accept={doc.accept} 
                  className="hidden" 
                  id={`file-${doc.key}`}
                  onChange={async (e) => {
                    const file = e.target.files[0]
                    await handleFileUpload(doc.key, file)
                    // Reset input value to allow re-uploading the same file
                    e.target.value = ''
                  }}
                />
                <label htmlFor={`file-${doc.key}`} className="text-primary text-sm font-medium cursor-pointer">
                  เลือกไฟล์
                </label>
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
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="เขียนคำตอบของคุณที่นี่ (ไม่เกิน 500 คำ)"
                maxLength="500"
              />
              <p className="text-sm text-gray-500 text-right mt-1">{essay.length} / 500 คำ</p>
            </div>
            <button 
              onClick={handleSaveEssay}
              disabled={isSaving}
              className="btn-primary disabled:opacity-50"
            >
              {isSaving ? 'กำลังบันทึก...' : 'บันทึกคำตอบ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
