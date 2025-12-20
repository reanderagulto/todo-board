import {
    create
} from 'zustand';

import {
    persist
} from 'zustand/middleware';

export const counterStore = create(
    persist(
        (set) => ({
            count: 0,
            increment: () => set((state) => ({ count: state.count + 1 })),
            decrement: () => set((state) => ({ count: state.count - 1 })),
        }),
        {
            name: 'counter-storage'
        }
    )
);