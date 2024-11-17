import { date } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppointmentStore = create(
  persist(
    (set) => ({
      // Estado del vehículo seleccionado
      selectedVehicle: null,
      selectedPolarizeType: null,
      selectedOpacity: null,
      selectedCoverage: null,
      totalCost: null,
      totalTime: null,
      selectedDate: null,
      selectedtTime: null,

      //estados de los otros pasos del agendamiento de citas
      //...
      //...
      //...

      //Action para establecer seleccionados
      setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
      setSelectedPolarizeType: (polarizeType) =>
        set({ selectedPolarizeType: polarizeType }),
      setSelectedOpacity: (opacity) => set({ selectedOpacity: opacity }),
      setSelectedCoverage: (coverage) => set({ selectedCoverage: coverage }),
      setTotalCost: (cost) => set({ totalCost: cost }),
      setTotalTime: (time) => set({ totalTime: time }),
      setDate: (date) => set({ selectedDate: date }),
      setTime: (time) => set({ selectedtTime: time }),

      //Action para limpiar
      clearSelectedVehicle: () => set({ selectedVehicle: null }),
    }),
    {
      name: 'appointment-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAppointmentStore;
