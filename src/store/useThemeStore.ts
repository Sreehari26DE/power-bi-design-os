import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ColorScheme {
  name: string;
  dataColors: string[];
  background: string;
  foreground: string;
  tableAccent: string;
  visualStyles: {
    '*': {
      '*': {
        background: [{ show: boolean; color: { solid: { color: string } } }];
        border: [{ show: boolean; color: { solid: { color: string } } }];
      };
    };
  };
}

interface ThemeState {
  baseMode: 'light' | 'dark' | 'both';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  fontFamily: string;
  vibrance: number;
  contrast: number;
  ensureAccessibility: boolean;
  colorblindSafe: boolean;
  palette: string[];
  
  // Actions
  setBaseMode: (mode: 'light' | 'dark' | 'both') => void;
  setPrimaryColor: (color: string) => void;
  setPalette: (colors: string[]) => void;
  updateSetting: (key: string, value: any) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      baseMode: 'light',
      primaryColor: '#0070f3',
      secondaryColor: '#ff0080',
      accentColor: '#7928ca',
      backgroundColor: '#ffffff',
      surfaceColor: '#f4f4f4',
      textColor: '#000000',
      fontFamily: 'Segoe UI',
      vibrance: 50,
      contrast: 50,
      ensureAccessibility: true,
      colorblindSafe: false,
      palette: ['#0070f3', '#ff0080', '#7928ca', '#f5a623', '#4ce1ac', '#000000'],

      setBaseMode: (mode) => set({ baseMode: mode }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setPalette: (colors) => set({ palette: colors }),
      updateSetting: (key, value) => set((state) => ({ ...state, [key]: value })),
      resetTheme: () => set({
        baseMode: 'light',
        primaryColor: '#0070f3',
        secondaryColor: '#ff0080',
        accentColor: '#7928ca',
        backgroundColor: '#ffffff',
        surfaceColor: '#f4f4f4',
        textColor: '#000000',
        fontFamily: 'Segoe UI',
        vibrance: 50,
        contrast: 50,
        ensureAccessibility: true,
        colorblindSafe: false,
        palette: ['#0070f3', '#ff0080', '#7928ca', '#f5a623', '#4ce1ac', '#000000'],
      }),
    }),
    {
      name: 'pbi-theme-storage',
    }
  )
);
