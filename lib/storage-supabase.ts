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
        .order('time_slot', { ascending: true });
      
      if (error) {
        console.error('Error fetching appointments:', error);
        return [];
      }
      
      // 转换字段名从 snake_case 到 camelCase
      return (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        date: item.date,
        timeSlot: item.time_slot,
        serviceType: item.service_type,
        completed: item.completed,
        createdAt: item.created_at,
      })) as Appointment[];
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

    // 转换字段名从 camelCase 到 snake_case
    const dbAppointment = {
      name: appointment.name,
      phone: appointment.phone,
      date: appointment.date,
      time_slot: appointment.timeSlot,
      service_type: appointment.serviceType,
      completed: appointment.completed,
      created_at: Date.now(),
    };

    const { data, error } = await supabase!
      .from(APPOINTMENTS_TABLE)
      .insert([dbAppointment])
      .select()
      .single();

    if (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }

    // 转换返回的数据
    return {
      id: data.id,
      name: data.name,
      phone: data.phone,
      date: data.date,
      timeSlot: data.time_slot,
      serviceType: data.service_type,
      completed: data.completed,
      createdAt: data.created_at,
    } as Appointment;
  },

  // 更新预约
  updateAppointment: async (id: string, updates: Partial<Appointment>): Promise<void> => {
    if (!isSupabaseAvailable()) {
      throw new Error('Supabase is not configured');
    }

    // 转换字段名从 camelCase 到 snake_case
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.date !== undefined) dbUpdates.date = updates.date;
    if (updates.timeSlot !== undefined) dbUpdates.time_slot = updates.timeSlot;
    if (updates.serviceType !== undefined) dbUpdates.service_type = updates.serviceType;
    if (updates.completed !== undefined) dbUpdates.completed = updates.completed;
    if (updates.createdAt !== undefined) dbUpdates.created_at = updates.createdAt;

    const { error } = await supabase!
      .from(APPOINTMENTS_TABLE)
      .update(dbUpdates)
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

