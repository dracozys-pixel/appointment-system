import { supabase, isSupabaseAvailable, APPOINTMENTS_TABLE } from './supabase';
import { Appointment } from './types';

// 使用 Supabase 的存储实现
export const storageSupabase = {
  // 获取所有预约
  getAppointments: async (): Promise<Appointment[]> => {
    if (!isSupabaseAvailable()) return [];
    
    try {
      const { data, error } = await supabase!
        .from(APPOINTMENTS_TABLE)
        .select('*')
        .order('date', { ascending: true })
        .order('timeSlot', { ascending: true });
      
      if (error) {
        console.error('Error fetching appointments:', error);
        return [];
      }
      
      return (data || []) as Appointment[];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  },

  // 添加预约
  addAppointment: async (appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> => {
    if (!isSupabaseAvailable()) {
      throw new Error('Supabase is not configured');
    }

    const newAppointment: Omit<Appointment, 'id'> = {
      ...appointment,
      createdAt: Date.now(),
    };

    const { data, error } = await supabase!
      .from(APPOINTMENTS_TABLE)
      .insert([newAppointment])
      .select()
      .single();

    if (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }

    return data as Appointment;
  },

  // 更新预约
  updateAppointment: async (id: string, updates: Partial<Appointment>): Promise<void> => {
    if (!isSupabaseAvailable()) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase!
      .from(APPOINTMENTS_TABLE)
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  // 删除预约
  deleteAppointment: async (id: string): Promise<void> => {
    if (!isSupabaseAvailable()) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase!
      .from(APPOINTMENTS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  },

  // 订阅实时更新
  subscribe: (callback: (appointments: Appointment[]) => void) => {
    if (!isSupabaseAvailable()) {
      return () => {}; // 返回空的取消订阅函数
    }

    const channel = supabase!
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: APPOINTMENTS_TABLE,
        },
        async () => {
          // 当数据变化时，重新获取所有预约
          const appointments = await storageSupabase.getAppointments();
          callback(appointments);
        }
      )
      .subscribe();

    // 返回取消订阅函数
    return () => {
      supabase!.removeChannel(channel);
    };
  },
};

