import React from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';

export interface MotionProviderProps {
  children: React.ReactNode;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  // Enforces NFR-4 and DESIGN §7 app-wide without scattered per-component checks
  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  );
};
