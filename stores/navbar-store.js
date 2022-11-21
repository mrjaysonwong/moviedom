import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const navStore = (set) => ({
  sidebar: false,
  subnav: false,
  routepath: [],
  toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
  showSubnav: () => set((state) => ({ subnav: !state.subnav })),
  handleClick: (path) =>
    set(() => ({ sidebar: false, subnav: false, routepath: path })),
});

const useNavstore = create(
  devtools(
    persist(navStore, {
      name: 'ACTIVE_PATH',
      getStorage: () => sessionStorage,
      partialize: (state) => ({ routepath: state.routepath }),
    })
  )
);

export default useNavstore;
