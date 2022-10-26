import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarMenuType } from '../types';

export const useMenuClickCallback = (row: SidebarMenuType) => {
  const navigate = useNavigate();

  return useCallback(() => {
    if (row.href) {
      window.open(row.href);
    }

    if (row.path) {
      navigate(row.path);
    }
  }, [row, navigate]);
};
