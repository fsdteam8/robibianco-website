/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"

class ApiClient {
  private instance: AxiosInstance

  constructor() {
    // Default to localhost for development, can be overridden via environment variables
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/v1"

    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)

        // You can add authentication tokens here if needed
        // const token = localStorage.getItem('authToken')
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`
        // }

        return config
      },
      (error) => {
        console.error("API Request Error:", error)
        return Promise.reject(error)
      },
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response: ${response.status} ${response.config.url}`)
        return response
      },
      (error) => {
        console.error("API Response Error:", error.response?.status, error.response?.data)

        // Handle common error scenarios
        if (error.response?.status === 401) {
          // Handle unauthorized access
          console.error("Unauthorized access - consider redirecting to login")
        } else if (error.response?.status >= 500) {
          // Handle server errors
          console.error("Server error - consider showing user-friendly message")
        }

        return Promise.reject(error)
      },
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }

  updateBaseURL(newBaseURL: string) {
    this.instance.defaults.baseURL = newBaseURL
    console.log(`API Base URL updated to: ${newBaseURL}`)
  }
}

export const apiClient = new ApiClient()
