import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { alumnoService, type Alumno } from '../services/alumnoService';

export function useAlumnos() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['alumnos'] });

  const { data: alumnos = [], isLoading } = useQuery({
    queryKey: ['alumnos'],
    queryFn: alumnoService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: alumnoService.create,
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Alumno }) =>
      alumnoService.update(id, data),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: alumnoService.remove,
    onSuccess: invalidate,
  });

  return {
    alumnos,
    isLoading,
    createAsync: createMutation.mutateAsync,
    updateAsync: updateMutation.mutateAsync,
    removeAsync: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}
