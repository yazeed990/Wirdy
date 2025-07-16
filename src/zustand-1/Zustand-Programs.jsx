import { create } from "zustand";

export const usePrograms = create((set) => ({
  selectedProgram: null,
  changeProgram: (chosen) => set((state) => ({ selectedProgram: chosen })),
}));


