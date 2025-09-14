import { create } from "zustand";
import { methodsByName, fiveShields } from "../utils/index.js";

export const usePrograms = create((set) => ({
  selectedProgram: null,
  changeProgram: (chosen) =>
    set(() => {
      try {
        localStorage.setItem("Quran-selected-program", chosen?.name || "");
      } catch (error) {
        console.error("Failed to save program selection:", error);
      }
      return { selectedProgram: chosen };
    }),
  open: false,
  handleOpenModal: () => set(() => ({ open: true })),
  handleCloseModal: () => set(() => ({ open: false })),
  completedDay: 0,
  changecompletedDay: (day) => set(() => ({ completedDay: day })),
  initFromStorage: () =>
    set(() => {
      try {
        const saved = localStorage.getItem("Quran-selected-program");
        const selected =
          saved && methodsByName[saved] ? methodsByName[saved] : fiveShields;
        return { selectedProgram: selected };
      } catch (error) {
        console.error("Failed to load program from storage:", error);
        return { selectedProgram: fiveShields };
      }
    }),
  resetProgress: (programName) =>
    set(() => {
      try {
        const key = `Quran-tracker-${programName || "fiveShields"}`;
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Failed to reset progress:", error);
      }
      return {};
    }),
  currentWorkoutIndex: null,
  setCurrentWorkoutIndex: (idx) => set(() => ({ currentWorkoutIndex: idx })),
}));
