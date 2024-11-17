import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppointmentStore = create(
  persist(
    (set) => ({
      // Estado del vehículo seleccionado
      selectedVehicle: null,

      //estados de los otros pasos del agendamiento de citas
      //...
      //...
      //...

      //Action para establecer el vehiculo seleccionado
      setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),

      //Ation para limpiar vehiculo seleccionado
      clearSelectedVehicle: () => set({ selectedVehicle: null }),
    }),
    {
      name: 'appointment-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAppointmentStore;
