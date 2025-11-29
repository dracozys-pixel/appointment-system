'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, Check, Trash2, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Appointment, FilterType, ServiceType } from '@/lib/types';

interface AppointmentListProps {
  appointments: Appointment[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AppointmentList({
  appointments,
  onToggleComplete,
  onDelete,
}: AppointmentListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | 'all'>('all');

  const filteredAppointments = appointments.filter((appointment) => {
    if (selectedDate && appointment.date !== selectedDate) return false;
    if (selectedServiceType !== 'all' && appointment.serviceType !== selectedServiceType) return false;

    if (filter === 'completed') return appointment.completed;
    if (filter === 'incomplete') return !appointment.completed;
    return true;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (a.date !== b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return a.timeSlot.localeCompare(b.timeSlot);
  });

  const uniqueDates = Array.from(new Set(appointments.map((a) => a.date))).sort();

  const filterButtons: { type: FilterType; label: string }[] = [
    { type: 'all', label: '全部' },
    { type: 'incomplete', label: '未完成' },
    { type: 'completed', label: '已完成' },
  ];

  const serviceTypeButtons: Array<{ type: ServiceType | 'all'; label: string }> = [
    { type: 'all', label: '全部事项' },
    { type: '唇腺活检', label: '唇腺活检' },
    { type: '术后拆线', label: '术后拆线' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {filterButtons.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === type
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-400 bg-white"
            >
              <option value="">所有日期</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {serviceTypeButtons.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setSelectedServiceType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedServiceType === type
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {sortedAppointments.length === 0 ? (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="text-gray-400 text-lg">暂无预约记录</div>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className={`p-6 bg-white/80 backdrop-blur-sm border-0 shadow-md transition-all hover:shadow-lg ${
                appointment.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <Checkbox
                    checked={appointment.completed}
                    onCheckedChange={() => onToggleComplete(appointment.id)}
                    className="w-5 h-5 border-2 data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span
                        className={`font-medium ${
                          appointment.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {appointment.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(appointment.id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors -mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">{appointment.serviceType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{appointment.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.timeSlot}</span>
                    </div>
                  </div>

                  {appointment.completed && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Check className="w-4 h-4" />
                      <span>已完成</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
