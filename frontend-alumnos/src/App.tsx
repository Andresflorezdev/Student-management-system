import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import type { Alumno } from './services/alumnoService';
import DashboardPage from './pages/DashboardPage';
import ListadoPage from './pages/ListadoPage';
import AddAlumnoPage from './pages/AddAlumnoPage';
import { useAlumnos } from './hooks/useAlumnos';
import { useTheme } from './hooks/useTheme';

const queryClient = new QueryClient();

type View = 'dashboard' | 'list' | 'add';

function AppContent() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const {
    alumnos,
    isLoading,
    createAsync,
    updateAsync,
    removeAsync,
    isCreating,
    isUpdating,
  } = useAlumnos();

  const handleGoToAdd = (alumno: Alumno | null = null) => {
    setSelectedAlumno(alumno);
    setActiveView('add');
  };

  const handleNavigate = (view: View) => {
    if (view === 'add') {
      handleGoToAdd(null);
      return;
    }
    if (view === 'dashboard') {
      setSelectedAlumno(null);
    }
    setActiveView(view);
  };

  const handleSubmit = async (data: Alumno) => {
    try {
      if (selectedAlumno?.id) {
        await updateAsync({ id: selectedAlumno.id, data });
        toast.success('Alumno actualizado');
      } else {
        await createAsync(data);
        toast.success('Alumno guardado');
      }

      setSelectedAlumno(null);
      setActiveView('list');
    } catch {
      toast.error('No se pudo guardar el alumno');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removeAsync(id);
      toast.success('Alumno eliminado');
    } catch {
      toast.error('No se pudo eliminar el alumno');
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors ${isDark ? 'bg-[radial-gradient(circle_at_top,#0f172a_0%,#111827_45%,#020617_100%)] text-slate-100' : 'bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_45%,#eef2ff_100%)] text-slate-900'}`}
    >
      <AppHeader
        activeView={activeView}
        onNavigate={handleNavigate}
        onToggleTheme={toggleTheme}
        isDark={isDark}
      />

      {activeView === 'dashboard' ? (
        <DashboardPage
          alumnos={alumnos}
          onGoList={() => setActiveView('list')}
          onGoAdd={() => handleGoToAdd(null)}
          isDark={isDark}
        />
      ) : null}

      {activeView === 'list' ? (
        <ListadoPage
          alumnos={alumnos}
          isLoading={isLoading}
          onEdit={handleGoToAdd}
          onDelete={handleDelete}
          onGoAdd={() => handleGoToAdd(null)}
          isDark={isDark}
        />
      ) : null}

      {activeView === 'add' ? (
        <AddAlumnoPage
          selected={selectedAlumno}
          onBack={() => {
            setSelectedAlumno(null);
            setActiveView('list');
          }}
          onSubmit={handleSubmit}
          isSaving={isCreating || isUpdating}
          isDark={isDark}
        />
      ) : null}

      <AppFooter
        activeView={activeView}
        onNavigate={handleNavigate}
        isDark={isDark}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: isDark ? '#0f172a' : '#ffffff',
            color: isDark ? '#e2e8f0' : '#0f172a',
            border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
