import { create } from 'zustand';
import { axiosInstance } from '../lib/axois';

export const useAuthStore = create((set) => ({
    authUser: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    isLoginIn: false,
    isSingingUp: false,
    isUpdatingProfile: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    login: (authUser) => set({ authUser, isAuthenticated: true }),
    logout: () => set({ authUser: null, isAuthenticated: false }),
    updateUser: (updatedUser) => set((state) => ({
        authUser: { ...state.authUser, ...updatedUser }
    })), 
    clearUser: () => set({ authUser: null, isAuthenticated: false }),
    isAdmin: () => set((state) => state.authUser && state.authUser.isAdmin),
    isVIP: () => set((state) => state.authUser && state.authUser.isVIP),
    getUser: () => set((state) => state.authUser),
    getUserId: () => set((state) => state.authUser ? state.authUser._id : null),
    getUserName: () => set((state) => state.authUser ? state.authUser.username :
        null),
    getUserEmail: () => set((state) => state.authUser ? state.authUser.email :
        null),
    getUserPhone: () => set((state) => state.authUser ? state.authUser.phone :
        null), 
    getUserProfilePicture: () => set((state) => state.authUser ?
        state.authUser.profilePicture : null),
    getUserFullName: () => set((state) => state.authUser ? `${state.authUser.firstName} ${state.authUser.lastName}` :
        null),
    getUserFirstName: () => set((state) => state.authUser ? state.authUser.firstName :
        null),
    getUserLastName: () => set((state) => state.authUser ? state.authUser.last :
        null),
    getUserIsAdmin: () => set((state) => state.authUser ? state.authUser.isAdmin :
        false),
    getUserIsVIP: () => set((state) => state.authUser ? state.authUser.isVIP :
        false),
    getUserCreatedAt: () => set((state) => state.authUser ? state.authUser.createdAt :
        null),
    getUserUpdatedAt: () => set((state) => state.authUser ? state.authUser.updatedAt :
        null),

 checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data, isAuthenticated: true , isCheckingAuth: false });
    
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null, isAuthenticated: false , isCheckingAuth: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

    } catch (error) {
        console.error("Error during signup:", error);
        // Handle error, e.g., show a toast notification
        // toast.error("Signup failed. Please try again.");
        throw error; // Re-throw the error for further handling if needed
    } finally {
      set({ isSigningUp: false });
    }
  },
   
}));