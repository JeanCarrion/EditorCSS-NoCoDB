import { useState } from 'react'
import { Moon, Sun, Code2 } from 'lucide-react'
import { useStore } from '../store/useStore'
import Sidebar from './Sidebar'
import Editor from './Editor'
import WipRules from './WipRules'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  const [activeTab, setActiveTab] = useState<'editor' | 'wip'>('editor')
  const { isDarkMode, setDarkMode } = useStore()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#1a1a2e]' : 'bg-gray-50'}`}>
      <header className="h-14 border-b border-gray-800 flex items-center px-4 justify-between bg-[#16213e]">
        <div className="flex items-center space-x-2 text-white">
          <Code2 className="w-6 h-6" />
          <h1 className="text-xl font-semibold">NoCoDB Custom Panel</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded ${
              activeTab === 'editor' 
                ? 'bg-[#0f3460] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('wip')}
            className={`px-4 py-2 rounded ${
              activeTab === 'wip' 
                ? 'bg-[#0f3460] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            WIP Rules
          </button>
          <button
            onClick={() => setDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          {activeTab === 'editor' ? <Editor /> : <WipRules />}
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}
