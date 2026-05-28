import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, FileText, CheckCircle, XCircle, Eye, Download, Search, Filter, Clock } from 'lucide-react'
import { supabase } from '../supabaseClient'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }
      
      // Check if user has admin role in metadata or users table
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
      
      if (error || userData?.role !== 'admin') {
        navigate('/dashboard')
        return
      }
      setIsAdmin(true)
      fetchData()
    } catch (error) {
      console.error('Error checking admin:', error)
      navigate('/login')
    }
  }

  const fetchData = async () => {
    try {
      // Fetch all users from the users table
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
      
      if (usersError) throw usersError
      
      // Fetch all applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('*')
      
      if (applicationsError) throw applicationsError
      
      setUsers(usersData || [])
      setApplications(applicationsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (userId, newStatus) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', userId)
      
      if (error) throw error
      
      fetchData()
      alert('อัพเดทสถานะสำเร็จ')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
    }
  }

  const viewUserDetail = async (userId) => {
    try {
      // Fetch user details with their application
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (userError) throw userError
      
      // Fetch user's application
      const { data: applicationData, error: appError } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (appError && appError.code !== 'PGRST116') throw appError // PGRST116 = not found
      
      setSelectedUser({
        user: userData,
        application: applicationData || null
      })
    } catch (error) {
      console.error('Error fetching user detail:', error)
    }
  }

  const downloadFile = (fileUrl) => {
    window.open(fileUrl, '_blank')
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.school.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-orange-100 text-orange-800', label: 'รอตรวจ' },
      under_review: { color: 'bg-blue-100 text-blue-800', label: 'กำลังพิจารณา' },
      accepted: { color: 'bg-green-100 text-green-800', label: 'ผ่านการคัดเลือก' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'ไม่ผ่านการคัดเลือก' }
    }
    const { color, label } = config[status] || config.pending
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">จัดการข้อมูลผู้สมัครและตรวจสอบเอกสาร</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ผู้สมัครทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">รอตรวจ</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.filter(u => u.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ผ่านการคัดเลือก</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.filter(u => u.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ไม่ผ่านการคัดเลือก</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.filter(u => u.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, อีเมล, โรงเรียน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">ทุกสถานะ</option>
                <option value="pending">รอตรวจ</option>
                <option value="under_review">กำลังพิจารณา</option>
                <option value="accepted">ผ่านการคัดเลือก</option>
                <option value="rejected">ไม่ผ่านการคัดเลือก</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ผู้สมัคร
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    โรงเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPAX
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วันที่สมัคร
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.school}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.grade.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString('th-TH')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => viewUserDetail(user.id)}
                        className="text-primary hover:text-primary-dark mr-3"
                      >
                        <Eye size={20} />
                      </button>
                      <select
                        value={user.status}
                        onChange={(e) => updateStatus(user.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                      >
                        <option value="pending">รอตรวจ</option>
                        <option value="under_review">กำลังพิจารณา</option>
                        <option value="accepted">ผ่านการคัดเลือก</option>
                        <option value="rejected">ไม่ผ่านการคัดเลือก</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">รายละเอียดผู้สมัคร</h2>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">ข้อมูลส่วนตัว</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-500">ชื่อ-นามสกุล:</span> {selectedUser.user.name}</p>
                      <p><span className="text-gray-500">อีเมล:</span> {selectedUser.user.email}</p>
                      <p><span className="text-gray-500">เบอร์โทร:</span> {selectedUser.user.phone}</p>
                      <p><span className="text-gray-500">โรงเรียน:</span> {selectedUser.user.school}</p>
                      <p><span className="text-gray-500">GPAX:</span> {selectedUser.user.grade.toFixed(2)}</p>
                      <p><span className="text-gray-500">สถานะ:</span> {getStatusBadge(selectedUser.user.status)}</p>
                    </div>
                  </div>

                  {selectedUser.application && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">ใบสมัคร</h3>
                      <div className="space-y-2">
                        <p><span className="text-gray-500">สถานะ:</span> {getStatusBadge(selectedUser.application.status)}</p>
                        <p><span className="text-gray-500">ยื่นเมื่อ:</span> {selectedUser.application.submitted_at ? new Date(selectedUser.application.submitted_at).toLocaleDateString('th-TH') : '-'}</p>
                        
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-700 mb-2">เอกสารที่อัปโหลด</h4>
                          <div className="space-y-2">
                            {selectedUser.application.photo_path && (
                              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm">รูปถ่าย</span>
                                <button
                                  onClick={() => downloadFile(selectedUser.application.photo_path)}
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  <Download size={16} /> ดาวน์โหลด
                                </button>
                              </div>
                            )}
                            {selectedUser.application.consent_form_path && (
                              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm">ใบขออนุญาต</span>
                                <button
                                  onClick={() => downloadFile(selectedUser.application.consent_form_path)}
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  <Download size={16} /> ดาวน์โหลด
                                </button>
                              </div>
                            )}
                            {!selectedUser.application.photo_path && !selectedUser.application.consent_form_path && (
                              <p className="text-sm text-gray-500">ยังไม่มีเอกสารที่อัปโหลด</p>
                            )}
                          </div>
                        </div>

                        {selectedUser.application.essay_answer && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-700 mb-2">คำตอบเรียงความ</h4>
                            <div className="p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap">
                              {selectedUser.application.essay_answer}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
