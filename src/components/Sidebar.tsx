import { useEffect } from 'react'
import { File, FileCode, FileJson, FileText, Plus, Loader2 } from 'lucide-react'
import { useStore } from '../store/useStore'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()
  switch (ext) {
    case 'css':
      return <FileText className="w-5 h-5" />
    case 'js':
      return <FileCode className="w-5 h-5" />
    case 'json':
      return <FileJson className="w-5 h-5" />
    default:
      return <File className="w-5 h-5" />
  }
}

export default function Sidebar() {
  const { files, setFiles, currentFile, setCurrentFile, isLoading, setLoading } = useStore()

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setLoading(true)
    try {
      const files = await api.getFiles()
      setFiles(files)
    } catch (error) {
      toast.error('Failed to load files')
      setFiles([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleFileClick = async (filename: string) => {
    try {
      const content = await api.getFileContent(filename)
      setCurrentFile(content)
    } catch (error) {
      toast.error('Failed to load file content')
    }
  }

  return (
    <div className="w-72 border-r border-gray-800 bg-[#16213e] text-gray-300">
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <h2 className="font-semibold">Files</h2>
        <button
          className="p-1 rounded hover:bg-gray-700"
          onClick={() => {/* TODO: Implement new file creation */}}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-8.5rem)]">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : files?.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No files found
          </div>
        ) : (
          files?.map((file) => (
            <button
              key={file.name}
              onClick={() => handleFileClick(file.name)}
              className={`w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 ${
                currentFile?.name === file.name ? 'bg-[#0f3460]' : ''
              }`}
            >
              {getFileIcon(file.name)}
              <span className="flex-1 text-left truncate">{file.name}</span>
              <span className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)}kb
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
