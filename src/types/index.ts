export type UserRole = 'patient' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
}

export type AppointmentStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    dentistId: string;
    dentistName: string;
    date: string;
    time: string;
    service: string;
    status: AppointmentStatus;
    createdAt: string;
}

export interface Dentist {
    id: string;
    name: string;
    specialty: string;
    availability: {
        [key: string]: string[]; // date -> array of times
    };
}
