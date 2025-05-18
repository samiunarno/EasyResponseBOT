import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Languages, 
  Code, 
  MessageSquare,
  ArrowRight,
  Globe,
  Zap,
  Shield
} from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 py-24 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Meet BondhuBot
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Your Bilingual AI Assistant
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Seamlessly communicate in English and Bangla with an AI assistant that understands your needs
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Seamless Communication
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for effective bilingual communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Languages className="h-8 w-8" />,
                title: "Bilingual Support",
                description: "Fluent in both English and Bangla for natural conversations"
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "Smart Chat",
                description: "Context-aware responses for meaningful interactions"
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Code Assistant",
                description: "Get help with programming in any language"
              },
              {
                icon: <Bot className="h-8 w-8" />,
                title: "AI Powered",
                description: "Advanced AI for accurate and helpful responses"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Globe className="h-12 w-12 text-blue-600" />,
                title: "Break Language Barriers",
                description: "Communicate effortlessly in both English and Bangla"
              },
              {
                icon: <Zap className="h-12 w-12 text-purple-600" />,
                title: "Instant Responses",
                description: "Get quick and accurate assistance whenever you need"
              },
              {
                icon: <Shield className="h-12 w-12 text-indigo-600" />,
                title: "Secure & Private",
                description: "Your conversations are protected and confidential"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-block mb-6">{benefit.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Start Your Bilingual Journey?
          </h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Try BondhuBot Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;