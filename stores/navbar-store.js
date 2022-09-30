import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const navStore = (set) => ({
  sidebar: false,
  subnav: false,
  pageactive: [],
  toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
  showSubnav: () => set((state) => ({ subnav: !state.subnav })),
  handleClick: (path) =>
    set(() => ({ sidebar: false, subnav: false, pageactive: path })),
});

const useNavstore = create(
  devtools(
    persist(navStore, {
      name: 'ACTIVE_PATH',
      getStorage: () => sessionStorage,
      partialize: (state) => ({ pageactive: state.pageactive }),
    })
  )
);

export default useNavstore;
