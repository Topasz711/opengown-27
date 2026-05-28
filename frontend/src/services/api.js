import { supabase } from '../supabaseClient'

// Auth APIs
export const authAPI = {
  me: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}

// Application APIs
export const applicationAPI = {
  submit: async (data) => {
    const { data: result, error } = await supabase
      .from('applications')
      .insert([data])
      .select()
    if (error) throw error
    return result
  },
  
  get: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
    if (error) throw error
    return data
  },
  
  update: async (id, data) => {
    const { data: result, error } = await supabase
      .from('applications')
      .update(data)
      .eq('id', id)
      .select()
    if (error) throw error
    return result
  },

  uploadDocument: async (id, file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${id}-${Math.random()}.${fileExt}`
    const filePath = `user_documents/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file)
      
    if (uploadError) throw uploadError
    
    const { data } = supabase.storage.from('documents').getPublicUrl(filePath)
    return data.publicUrl
  }
}

// Schedule APIs
export const scheduleAPI = {
  getPublic: async () => {
    const { data, error } = await supabase.from('schedules').select('*').eq('is_public', true)
    if (error) throw error
    return data
  },
  getPrivate: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')
    const { data, error } = await supabase.from('schedules').select('*').eq('is_public', false)
    if (error) throw error
    return data
  },
}

// Contact APIs
export const contactAPI = {
  sendMessage: async (data) => {
    const { data: result, error } = await supabase.from('contacts').insert([data])
    if (error) throw error
    return result
  },
}

export default supabase
