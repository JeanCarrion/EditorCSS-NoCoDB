import { File, FileContent, WipRule } from '../types'

const BASE_URL = 'https://apps.unalukaglobal.com'

export const api = {
  async getFiles(): Promise<File[]> {
    const response = await fetch(`${BASE_URL}/api/files`)
    const data = await response.json()
    return data.files
  },

  async getFileContent(filename: string): Promise<FileContent> {
    const response = await fetch(`${BASE_URL}/api/files/${filename}`)
    return await response.json()
  },

  async updateFile(filename: string, content: string): Promise<void> {
    await fetch(`${BASE_URL}/api/files/${filename}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
  },

  async deleteFile(filename: string): Promise<void> {
    await fetch(`${BASE_URL}/api/files/${filename}`, {
      method: 'DELETE'
    })
  },

  async getWipRules(): Promise<WipRule[]> {
    const response = await fetch(`${BASE_URL}/api/wip-rules/list`)
    const data = await response.json()
    return data.rules
  },

  async createWipRule(rule: Omit<WipRule, 'view_id'>): Promise<void> {
    await fetch(`${BASE_URL}/api/wip-rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rule)
    })
  }
}
