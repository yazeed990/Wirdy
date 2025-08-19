import { create } from "zustand";
import { methodsByName, fiveShields } from "../utils/index.js";

export const usePrograms = create((set) => ({
  selectedProgram: null,
  changeProgram: (chosen) =>
    set(() => {
      try {
        localStorage.setItem("Quran-selected-program", chosen?.name || "");
      } catch {}
      return { selectedProgram: chosen };
    }),
  open: false,
  handleOpenModal: () => set((state) => ({ open: true })),
  handleCloseModal: () => set((state) => ({ open: false })),
  completedDay: 0,
  changecompletedDay: (day) => set((state) => ({ completedDay: day })),
  initFromStorage: () =>
    set(() => {
      try {
        const saved = localStorage.getItem("Quran-selected-program");
        const selected =
          saved && methodsByName[saved] ? methodsByName[saved] : fiveShields;
        return { selectedProgram: selected };
      } catch {
        return { selectedProgram: fiveShields };
      }
    }),
  resetProgress: (programName) =>
    set(() => {
      try {
        const key = `Quran-tracker-${programName || "fiveShields"}`;
        localStorage.removeItem(key);
      } catch {}
      return {};
    }),
  currentWorkoutIndex: null,
  setCurrentWorkoutIndex: (idx) => set(() => ({ currentWorkoutIndex: idx })),
}));
