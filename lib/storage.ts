import { Appointment } from './types';

const STORAGE_KEY = 'appointments';

export const storage = {
  getAppointments: (): Appointment[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAppointments: (appointments: Appointment[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  },

  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
    const appointments = storage.getAppointments();
    const newAppointment: Appointment = {
      ...appointment,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    appointments.push(newAppointment);
    storage.saveAppointments(appointments);
    return newAppointment;
  },

  updateAppointment: (id: string, updates: Partial<Appointment>): void => {
    const appointments = storage.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updates };
      storage.saveAppointments(appointments);
    }
  },

  deleteAppointment: (id: string): void => {
    const appointments = storage.getAppointments();
    const filtered = appointments.filter(a => a.id !== id);
    storage.saveAppointments(filtered);
  },
};
