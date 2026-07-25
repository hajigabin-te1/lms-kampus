import { create } from "zustand";

interface Notification {
  id: string;
  type: string;
  title: string;
  desc: string;
  time: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const initialData = [
  {
    id: "1",
    type: "finance",
    title: "Pembayaran UKT Diterima",
    desc: "Registrasi keuangan Semester Genap sah.",
    time: "2 jam lalu",
    isRead: false,
  },
  {
    id: "2",
    type: "academic",
    title: "Nilai KHS Baru Dirilis",
    desc: "Dosen Pengampu telah menginput nilai matakuliah Basis Data.",
    time: "Kemarin",
    isRead: false,
  },
  {
    id: "3",
    type: "system",
    title: "Pemeliharaan Sistem Server",
    desc: "SIAKAD Mobile akan nonaktif pada hari Sabtu pukul 23.00 WIB.",
    time: "3 hari lalu",
    isRead: true,
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: initialData,
  unreadCount: initialData.filter((n) => !n.isRead).length,

  setNotifications: (data) =>
    set({
      notifications: data,
      unreadCount: data.filter((n) => !n.isRead).length,
    }),

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, isRead: true }));
      return { notifications: updated, unreadCount: 0 };
    }),

  deleteNotification: (id) =>
    set((state) => {
      const updated = state.notifications.filter((n) => n.id !== id);
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),
}));
