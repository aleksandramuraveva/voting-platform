import { toast } from 'react-hot-toast';
import { useCallback } from 'react';

export const useToast = () => {
  const showError = useCallback((message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
    });
  }, []);

  const showSuccess = useCallback((message: string) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
  }, []);

  const showInfo = useCallback((message: string) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
    });
  }, []);

  return { showError, showSuccess, showInfo };
};
