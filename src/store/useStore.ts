import { create } from 'zustand'
import { File, FileContent, WipRule } from '../types'

interface Store {
  files: File[]
  currentFile: FileContent | null
  isDarkMode: boolean
  isLoading: boolean
  setFiles: (files: File[]) => void
  setCurrentFile: (file: FileContent | null) => void
  setDarkMode: (isDark: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set) => ({
  files: [], // Initialize with empty array
  currentFile: null,
  isDarkMode: true,
  isLoading: false,
  setFiles: (files) => set({ files }),
  setCurrentFile: (file) => set({ currentFile: file }),
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
