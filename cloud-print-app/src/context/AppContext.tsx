"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  image: string | null;
  frameId: string | null;
  setImage: (image: string | null) => void;
  setFrameId: (frameId: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<string | null>(null);
  const [frameId, setFrameId] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ image, frameId, setImage, setFrameId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
