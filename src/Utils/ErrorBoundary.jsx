import React, { Component } from "react";
import { Alert } from "antd";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert
          type="error"
          message="An error occurred"
          description="Please try again later."
          style={{
            backgroundColor: "#f2dede",
            borderColor: "#ebccd1",
            color: "#a94442",
          }}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
