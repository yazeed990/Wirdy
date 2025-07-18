import { create } from "zustand";

export const usePrograms = create((set) => ({
  selectedProgram: null,
  changeProgram: (chosen) => set((state) => ({ selectedProgram: chosen })),
  open: false ,
  handleOpenModal: () => set((state) => ({open: true})),
handleCloseModal: () => set((state) => ({open: false})),
 completedDay: 99,
 changecompletedDay: (day) => set((state) => ({completedDay: day}))
}));


