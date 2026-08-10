import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('App crashed:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0] px-6">
          <div className="app-card max-w-md text-center">
            <p className="text-4xl mb-3">⚠️</p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-5">
              An unexpected error occurred. Your data is safe — try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="app-btn btn-primary"
            >
              Reload app
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}