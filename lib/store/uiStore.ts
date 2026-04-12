import { create } from "zustand";

interface UIState {
  selectedBranch: string;
  chatbotOpen: boolean;
  mobileMenuOpen: boolean;
  loadingScreenDone: boolean;
  stickyBarVisible: boolean;
  setSelectedBranch: (branch: string) => void;
  setChatbotOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setLoadingScreenDone: (done: boolean) => void;
  setStickyBarVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedBranch: "riyadh",
  chatbotOpen: false,
  mobileMenuOpen: false,
  loadingScreenDone: false,
  stickyBarVisible: false,
  setSelectedBranch: (selectedBranch) => set({ selectedBranch }),
  setChatbotOpen: (chatbotOpen) => set({ chatbotOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setLoadingScreenDone: (loadingScreenDone) => set({ loadingScreenDone }),
  setStickyBarVisible: (stickyBarVisible) => set({ stickyBarVisible }),
}));
