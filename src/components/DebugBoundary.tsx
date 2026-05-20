import { Component, type ErrorInfo, type ReactNode } from 'react'

type State = { error: Error | null; info: ErrorInfo | null }

export class DebugBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null, info: null }

  static getDerivedStateFromError(error: Error): State {
    return { error, info: null }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[DebugBoundary]', error, info)
    this.setState({ error, info })
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: 24, fontFamily: 'ui-monospace, monospace',
          color: '#fff', background: '#0b1a26', minHeight: '100vh',
          whiteSpace: 'pre-wrap', overflow: 'auto', fontSize: 13, lineHeight: 1.5,
        }}>
          <div style={{ color: '#ff7a7a', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
            ⚠ Runtime error capturado
          </div>
          <div style={{ color: '#ffd57a', marginBottom: 8 }}>{this.state.error.name}: {this.state.error.message}</div>
          <details open>
            <summary style={{ cursor: 'pointer', color: '#9bd', margin: '12px 0 4px' }}>Stack</summary>
            <pre style={{ background: '#000', padding: 12, borderRadius: 6 }}>{this.state.error.stack}</pre>
          </details>
          {this.state.info && (
            <details open>
              <summary style={{ cursor: 'pointer', color: '#9bd', margin: '12px 0 4px' }}>Component stack</summary>
              <pre style={{ background: '#000', padding: 12, borderRadius: 6 }}>{this.state.info.componentStack}</pre>
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
