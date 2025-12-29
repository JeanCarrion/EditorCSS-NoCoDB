import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { WipRule } from '../types'
import toast from 'react-hot-toast'

export default function WipRules() {
  const [rules, setRules] = useState<WipRule[]>([])
  const [newRule, setNewRule] = useState({
    url: '',
    estado: 'Pendiente',
    limite: 5
  })

  useEffect(() => {
    loadRules()
  }, [])

  const loadRules = async () => {
    try {
      const rules = await api.getWipRules()
      setRules(rules)
    } catch (error) {
      toast.error('Failed to load WIP rules')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const viewIdMatch = newRule.url.match(/vw[a-z0-9]+/)
    if (!viewIdMatch) {
      toast.error('Invalid view ID in URL')
      return
    }

    try {
      await api.createWipRule({
        estado: newRule.estado,
        limite: newRule.limite
      })
      toast.success('Rule created successfully')
      loadRules()
      setNewRule({ url: '', estado: 'Pendiente', limite: 5 })
    } catch (error) {
      toast.error('Failed to create rule')
    }
  }

  return (
    <div className="p-6 text-gray-300">
      <h2 className="text-2xl font-semibold mb-6">WIP Rules</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-2xl">
        <div>
          <label className="block mb-2">URL</label>
          <input
            type="url"
            value={newRule.url}
            onChange={(e) => setNewRule({ ...newRule, url: e.target.value })}
            className="w-full p-2 rounded bg-[#16213e] border border-gray-700"
            placeholder="https://example.com/view/vw123..."
            required
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-2">Estado</label>
            <select
              value={newRule.estado}
              onChange={(e) => setNewRule({ ...newRule, estado: e.target.value })}
              className="w-full p-2 rounded bg-[#16213e] border border-gray-700"
            >
              <option>Pendiente</option>
              <option>En Proceso</option>
              <option>Completado</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block mb-2">Límite</label>
            <input
              type="number"
              value={newRule.limite}
              onChange={(e) => setNewRule({ ...newRule, limite: Number(e.target.value) })}
              className="w-full p-2 rounded bg-[#16213e] border border-gray-700"
              min="1"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-[#0f3460] text-white rounded hover:bg-[#0f3460]/80"
        >
          Add Rule
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">View ID</th>
              <th className="text-left p-2">Estado</th>
              <th className="text-left p-2">Límite</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.view_id} className="border-b border-gray-800">
                <td className="p-2">{rule.view_id}</td>
                <td className="p-2">{rule.estado}</td>
                <td className="p-2">{rule.limite}</td>
                <td className="p-2">
                  <button
                    onClick={() => {/* TODO: Implement delete */}}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
