import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ConfiguratorErrorBoundaryProps {
  children: ReactNode;
}

interface ConfiguratorErrorBoundaryState {
  hasError: boolean;
}

export class ConfiguratorErrorBoundary extends Component<
  ConfiguratorErrorBoundaryProps,
  ConfiguratorErrorBoundaryState
> {
  state: ConfiguratorErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ConfiguratorErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ProductConfigurator crashed:', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="configurator">
        <div className="error-message" role="alert">
          <div>
            <strong>Something went wrong while loading the configurator.</strong> Please try again.
            If the problem continues, contact our support team.
          </div>
          <div className="error-actions">
            <button type="button" className="btn btn-secondary" onClick={this.handleRetry}>
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }
}
