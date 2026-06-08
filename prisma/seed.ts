import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const alumnos = [
  {
    nombre: 'Ana',
    apellido: 'García López',
    email: 'ana.garcia@example.com',
    telefono: '3001001001',
    curso: 'Matemáticas I',
  },
  {
    nombre: 'Carlos',
    apellido: 'Martínez Ruiz',
    email: 'carlos.martinez@example.com',
    telefono: '3001001002',
    curso: 'Historia Universal',
  },
  {
    nombre: 'Laura',
    apellido: 'Pérez Gómez',
    email: 'laura.perez@example.com',
    telefono: '3001001003',
    curso: 'Programación 1',
  },
  {
    nombre: 'Diego',
    apellido: 'Sánchez Torres',
    email: 'diego.sanchez@example.com',
    telefono: '3001001004',
    curso: 'Física Básica',
  },
  {
    nombre: 'Mariana',
    apellido: 'Ramírez Castro',
    email: 'mariana.ramirez@example.com',
    telefono: '3001001005',
    curso: 'Química General',
  },
  {
    nombre: 'Julián',
    apellido: 'Hernández Díaz',
    email: 'julian.hernandez@example.com',
    telefono: '3001001006',
    curso: 'Bases de Datos',
  },
  {
    nombre: 'Sofía',
    apellido: 'Torres Moreno',
    email: 'sofia.torres@example.com',
    telefono: '3001001007',
    curso: 'Inglés Intermedio',
  },
  {
    nombre: 'Andrés',
    apellido: 'Vargas Castillo',
    email: 'andres.vargas@example.com',
    telefono: '3001001008',
    curso: 'Lengua y Literatura',
  },
  {
    nombre: 'Valentina',
    apellido: 'Morales Rojas',
    email: 'valentina.morales@example.com',
    telefono: '3001001009',
    curso: 'Arquitectura de Software',
  },
  {
    nombre: 'Samuel',
    apellido: 'Ortega Navarro',
    email: 'samuel.ortega@example.com',
    telefono: '3001001010',
    curso: 'Educación Física',
  },
];

async function main() {
  await prisma.alumno.deleteMany();
  await prisma.alumno.createMany({
    data: alumnos,
  });

  console.log(`Seed completado: ${alumnos.length} alumnos insertados.`);
}

main()
  .catch((error) => {
    console.error('Error ejecutando el seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
