import { create } from "zustand";

export interface BookingState {
  branch: string | null;
  service: string | null;
  therapist: string | null;
  date: string | null;
  time: string | null;
  patientName: string;
  patientMobile: string;
  patientId: string;
  patientEmail: string;
  insurance: boolean;
  insurerId: string | null;
  currentStep: number;
  bookingRef: string | null;
  isComplete: boolean;
  setBranch: (branch: string) => void;
  setService: (service: string) => void;
  setTherapist: (therapist: string | null) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setPatientDetails: (details: Partial<BookingState>) => void;
  setCurrentStep: (step: number) => void;
  setBookingRef: (ref: string) => void;
  setComplete: (complete: boolean) => void;
  reset: () => void;
}

const initialState = {
  branch: null,
  service: null,
  therapist: null,
  date: null,
  time: null,
  patientName: "",
  patientMobile: "",
  patientId: "",
  patientEmail: "",
  insurance: false,
  insurerId: null,
  currentStep: 1,
  bookingRef: null,
  isComplete: false,
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setBranch: (branch) => set({ branch }),
  setService: (service) => set({ service }),
  setTherapist: (therapist) => set({ therapist }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setPatientDetails: (details) => set((state) => ({ ...state, ...details })),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setBookingRef: (bookingRef) => set({ bookingRef }),
  setComplete: (isComplete) => set({ isComplete }),
  reset: () => set(initialState),
}));
