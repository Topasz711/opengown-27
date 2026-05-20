// Image compression utility
export const compressImage = async (file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }))
            } else {
              reject(new Error('Compression failed'))
            }
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = (error) => reject(error)
    }
    reader.onerror = (error) => reject(error)
  })
}

// Date formatting utility
export const formatDate = (dateString, format = 'th') => {
  const date = new Date(dateString)
  
  if (format === 'th') {
    const thaiYear = date.getFullYear() + 543
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]
    const day = date.getDate().toString().padStart(2, '0')
    const month = months[date.getMonth()]
    return `${day} ${month} ${thaiYear}`
  }
  
  return date.toLocaleDateString('th-TH')
}

export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  const time = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  return `${formatDate(dateString)} เวลา ${time} น.`
}

// File validation utilities
export const validateFile = (file, maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  
  if (file.size > maxSizeBytes) {
    return { valid: false, message: `ไฟล์มีขนาดใหญ่เกิน ${maxSizeMB}MB` }
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, message: 'ประเภทไฟล์ไม่ถูกต้อง (รองรับเฉพาะ JPG, PNG, PDF)' }
  }
  
  return { valid: true }
}

// Countdown calculation
export const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false
  }
}
