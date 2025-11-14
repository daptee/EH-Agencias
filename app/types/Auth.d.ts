export interface UserData {
  id: number
  first_name: string
  last_name: string
  email: string
  agency_code: string
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  message: string
  access_token?: string | null
  token_type?: string | null
  expires_in?: number | null
  data: {
    user: UserData
  }
}

export interface RegisterResponse {
  message: string
  data: UserData
}

export interface LogoutResponse {
  message: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AgencyResponse {
  CODIGO: string
  DIRECCION: string
  EMAIL: string
  ESTADO: string
  NOMBRE: string
  RAZON_SOCIAL: string
  TELEFONOS: string
}
