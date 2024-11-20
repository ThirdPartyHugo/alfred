import React from 'react';
import { ArrowRight, Brain, BarChart3, Users, Shield, ArrowUpRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Alfred</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate("/login")} className="text-gray-600 hover:text-gray-900">
              Login
            </button>
            <button onClick={() => window.location.href = '/signup'} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24 sm:pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Manage Your Agency with
            <span className="text-blue-600"> Intelligence</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Streamline your agency operations, manage team assignments, and track financial metrics all in one powerful dashboard.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={() => window.location.href = '/signup'} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="text-sm font-semibold leading-6 text-gray-900 flex items-center space-x-2">
              <span>View Demo</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div>
              <BarChart3 className="h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Financial Insights</h3>
              <p className="mt-2 text-gray-600">Track your MRR, costs, and profits with detailed breakdowns and beautiful visualizations.</p>
            </div>
            <div>
              <Users className="h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Team Management</h3>
              <p className="mt-2 text-gray-600">Efficiently manage your media buyers, content creators, and ad designers in one place.</p>
            </div>
            <div>
              <Shield className="h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Client Security</h3>
              <p className="mt-2 text-gray-600">Keep your client data secure with role-based access control and detailed audit logs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
