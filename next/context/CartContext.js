import React, { createContext } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { auth } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cartQuantity', auth.userData?.id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3005/api/cart/${auth.userData.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!auth.userData,
    // 暫時調整
    refetchInterval: 1000,
  });

  return (
    <CartContext.Provider
      value={{
        cartQuantity: data?.totalQuantity || 0,
        setCartQuantity: refetch,
        loading: isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
