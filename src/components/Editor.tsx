import { useCallback, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Save, Trash2, RotateCcw } from 'lucide-react'
import { useStore } from '../store/useStore'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export default function CodeEditor() {
  const { currentFile, isDarkMode } = useStore()

  const handleSave = useCallback(async () => {
    if (!currentFile) return
    
    try {
      await api.updateFile(currentFile.name, currentFile.content)
      toast.success('File saved successfully')
    } catch (error) {
      toast.error('Failed to save file')
    }
  }, [currentFile])

  const handleDelete = async () => {
    if (!currentFile || !currentFile.editable) return
    
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await api.deleteFile(currentFile.name)
        toast.success('File deleted successfully')
      } catch (error) {
        toast.error('Failed to delete file')
      }
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleSave])

  if (!currentFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a file to edit
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-gray-800 bg-[#16213e]">
        <div className="text-gray-300">{currentFile.name}</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="p-2 rounded hover:bg-gray-700 text-gray-300"
            title="Save (Ctrl+S)"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            onClick={() => {/* TODO: Implement reload */}}
            className="p-2 rounded hover:bg-gray-700 text-gray-300"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          {currentFile.editable && (
            <button
              onClick={handleDelete}
              className="p-2 rounded hover:bg-gray-700 text-gray-300"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme={isDarkMode ? 'vs-dark' : 'light'}
          value={currentFile.content}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            readOnly: !currentFile.editable,
          }}
        />
      </div>
    </div>
  )
}
