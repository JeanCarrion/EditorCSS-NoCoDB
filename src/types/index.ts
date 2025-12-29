export interface File {
  name: string;
  size: number;
  editable: boolean;
}

export interface FileContent {
  name: string;
  content: string;
  size: number;
}

export interface WipRule {
  view_id: string;
  estado: string;
  limite: number;
}

export interface ApiResponse<T> {
  status?: string;
  data?: T;
  error?: string;
}
