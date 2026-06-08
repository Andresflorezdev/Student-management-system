import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export interface Alumno {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  curso: string;
  creadoEn?: string;
}

export const alumnoService = {
  getAll: () => api.get<Alumno[]>('/alumnos').then((r) => r.data),
  create: (data: Alumno) =>
    api.post<Alumno>('/alumnos', data).then((r) => r.data),
  update: (id: number, data: Alumno) =>
    api.put<Alumno>(`/alumnos/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/alumnos/${id}`),
};
