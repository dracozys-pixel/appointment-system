'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const TIME_SLOTS = [
  '14:30-16:00',
  '16:00-17:00',
];

const SERVICE_TYPES: Array<{ value: '唇腺活检' | '术后拆线'; label: string }> = [
  { value: '唇腺活检', label: '唇腺活检' },
  { value: '术后拆线', label: '术后拆线' },
];

interface AppointmentFormProps {
  onSubmit: (data: {
    name: string;
    phone: string;
    date: string;
    timeSlot: string;
    serviceType: '唇腺活检' | '术后拆线';
  }) => void;
}

export function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [serviceType, setServiceType] = useState<'唇腺活检' | '术后拆线' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && date && selectedSlot && serviceType) {
      onSubmit({ name, phone, date, timeSlot: selectedSlot, serviceType: serviceType as '唇腺活检' | '术后拆线' });
      setName('');
      setPhone('');
      setDate('');
      setSelectedSlot('');
      setServiceType('');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            姓名
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入您的姓名"
            required
            className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            手机号码
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入您的手机号码"
            required
            className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            预约日期
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            required
            className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            选择事项
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {SERVICE_TYPES.map((service) => (
              <button
                key={service.value}
                type="button"
                onClick={() => setServiceType(service.value)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  serviceType === service.value
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            选择时间段
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  selectedSlot === slot
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white py-6 text-base font-medium transition-colors shadow-lg"
          disabled={!name || !phone || !date || !selectedSlot || !serviceType}
        >
          确认预约
        </Button>
      </form>
    </Card>
  );
}
