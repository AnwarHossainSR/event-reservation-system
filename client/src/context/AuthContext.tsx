import { userService } from '@/services/user'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

// Define user interface
interface User {
  name: string
  email: string
  role?: string
  id?: string
}

// Define the context type
interface AuthContextType {
  user: User | null
  token: string
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: User & { password: string }) => Promise<void>
  logout: () => void
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string>(
    localStorage.getItem('authToken') || ''
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    // Simulate fetching user info if token is present
    const fetchUser = async () => {
      if (token) {
        try {
          const userInfo = await userService.getMyInfo()
          console.log('User info:', userInfo)
          setUser(userInfo)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Error fetching user info:', error)
          setIsAuthenticated(false)
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [token])

  const register = async (userData: User & { password: string }) => {
    setLoading(true)
    try {
      const response = await userService.register(
        userData.name,
        userData.email,
        userData.password
      )
      setToken(response.token)
      setUser(userData)
      localStorage.setItem('authToken', response.token)
      setIsAuthenticated(true)
    } catch (error: any) {
      console.error('Registration error:', error)
      throw new Error(error.response.data.message || 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await userService.login(email, password)
      localStorage.setItem('authToken', response.token)
      setToken(response.token)
      setIsAuthenticated(true)
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
