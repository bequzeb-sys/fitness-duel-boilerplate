"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen bg-[#050911] flex items-center justify-center p-8">
          <div className="bg-bg-card border border-rose-500/30 rounded-2xl p-8 max-w-md text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-rose-500/10 rounded-full border border-rose-500/20">
                <AlertTriangle className="h-8 w-8 text-rose-400" />
              </div>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-white text-lg">Oups, quelque chose s&apos;est cassé</h2>
              <p className="text-slate-400 text-sm mt-2">
                {this.state.error?.message ?? "Une erreur inattendue s'est produite."}
              </p>
            </div>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              Réesayer
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
