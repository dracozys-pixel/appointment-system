import { Appointment } from './types';
import { isSupabaseAvailable } from './supabase';
import { storageSupabase } from './storage-supabase';

const STORAGE_KEY = 'appointments';

// 统一的存储接口，自动选择 Supabase 或 localStorage
export const storage = {
  // 获取所有预约（异步）
  getAppointments: async (): Promise<Appointment[]> => {
    if (isSupabaseAvailable()) {
      return await storageSupabase.getAppointments();
    }
    
    // 回退到 localStorage
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // 添加预约（异步）
  addAppointment: async (appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> => {
    if (isSupabaseAvailable()) {
      return await storageSupabase.addAppointment(appointment);
    }
    
    // 回退到 localStorage
    if (typeof window === 'undefined') {
      throw new Error('Cannot add appointment on server');
    }
    
    const appointments = await storage.getAppointments();
    const newAppointment: Appointment = {
      ...appointment,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    return newAppointment;
  },

  // 更新预约（异步）
  updateAppointment: async (id: string, updates: Partial<Appointment>): Promise<void> => {
    if (isSupabaseAvailable()) {
      return await storageSupabase.updateAppointment(id, updates);
    }
    
    // 回退到 localStorage
    if (typeof window === 'undefined') return;
    
    const appointments = await storage.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    }
  },

  // 删除预约（异步）
  deleteAppointment: async (id: string): Promise<void> => {
    if (isSupabaseAvailable()) {
      return await storageSupabase.deleteAppointment(id);
    }
    
    // 回退到 localStorage
    if (typeof window === 'undefined') return;
    
    const appointments = await storage.getAppointments();
    const filtered = appointments.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // 订阅实时更新（仅 Supabase）
  subscribe: (callback: (appointments: Appointment[]) => void) => {
    if (isSupabaseAvailable()) {
      return storageSupabase.subscribe(callback);
    }
    // localStorage 不支持实时更新
    return () => {};
  },
};
