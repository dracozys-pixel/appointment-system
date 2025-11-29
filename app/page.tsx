'use client';

import { useState, useEffect } from 'react';
import { CalendarCheck, List } from 'lucide-react';
import { AppointmentForm } from '@/components/appointment-form';
import { AppointmentList } from '@/components/appointment-list';
import { storage } from '@/lib/storage';
import { Appointment } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // 加载预约数据
  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await storage.getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast.error('加载预约数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadAppointments();

    // 订阅实时更新（如果使用 Supabase）
    const unsubscribe = storage.subscribe((updatedAppointments) => {
      setAppointments(updatedAppointments);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddAppointment = async (data: {
    name: string;
    phone: string;
    date: string;
    timeSlot: string;
    serviceType: '唇腺活检' | '术后拆线';
  }) => {
    try {
      await storage.addAppointment({
        ...data,
        completed: false,
      });
      await loadAppointments();
      toast.success('预约成功！', {
        description: `已为您预约 ${data.date} ${data.timeSlot} - ${data.serviceType}`,
      });
    } catch (error) {
      console.error('Error adding appointment:', error);
      toast.error('预约失败，请重试');
    }
  };

  const handleToggleComplete = async (id: string) => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) {
      try {
        await storage.updateAppointment(id, { completed: !appointment.completed });
        await loadAppointments();
        toast.success(
          appointment.completed ? '已标记为未完成' : '已标记为完成'
        );
      } catch (error) {
        console.error('Error updating appointment:', error);
        toast.error('更新失败，请重试');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storage.deleteAppointment(id);
      await loadAppointments();
      toast.success('预约已删除');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('删除失败，请重试');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Toaster position="top-center" />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            预约登记系统
          </h1>
          <p className="text-gray-500 text-lg">中山附一·风湿免疫</p>
        </div>

        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-md p-1">
            <TabsTrigger
              value="book"
              className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              创建预约
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white transition-all"
            >
              <List className="w-4 h-4" />
              查看预约
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <AppointmentForm onSubmit={handleAddAppointment} />
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <AppointmentList
              appointments={appointments}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
