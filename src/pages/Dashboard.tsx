import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  History, 
  Settings, 
  Bot, 
  BookOpen,
  Code,
  Languages,
  Pencil,
  HelpCircle,
  Bell,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Chat",
      description: "Start a conversation with BondhuBot",
      link: "/chat",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <Languages className="h-6 w-6" />,
      title: "Translation",
      description: "Translate between English and Bangla",
      link: "/chat?mode=translate",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Pencil className="h-6 w-6" />,
      title: "Writing Assistant",
      description: "Get help with writing and editing",
      link: "/chat?mode=write",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Helper",
      description: "Get programming assistance",
      link: "/chat?mode=code",
      color: "from-indigo-500 to-blue-600"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "New Feature Available",
      message: "Try our enhanced translation capabilities!",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "System Update",
      message: "BondhuBot has been updated with new features",
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <Link to="/dashboard" className="flex items-center">
                <Bot className="h-8 w-8 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BondhuBot</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-700"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <Link to="/settings" className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="h-5 w-5" />
              </Link>
              <Link to="/history" className="p-2 text-gray-500 hover:text-gray-700">
                <History className="h-5 w-5" />
              </Link>
              <Link to="/help" className="p-2 text-gray-500 hover:text-gray-700">
                <HelpCircle className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Settings
              </Link>
              <Link
                to="/history"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                History
              </Link>
              <Link
                to="/help"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Help
              </Link>
              <button
                onClick={() => {
                  // Handle logout
                  console.log('Logout clicked');
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Bell className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
            <div className="py-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  // Handle logout
                  console.log('Logout clicked');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to BondhuBot Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Your bilingual AI assistant for seamless communication
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Total Conversations", value: "128", color: "bg-blue-500" },
            { title: "Languages Used", value: "2", color: "bg-purple-500" },
            { title: "Time Saved", value: "5.2 hrs", color: "bg-pink-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h2 className="ml-2 text-xl font-semibold">Quick Tips</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Use both English and Bangla freely</li>
              <li>• Ask for translations anytime</li>
              <li>• Get writing help for any content</li>
              <li>• Request code explanations</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Bot className="h-6 w-6 text-purple-600" />
              <h2 className="ml-2 text-xl font-semibold">What's New</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Enhanced translation accuracy</li>
              <li>• New writing assistance features</li>
              <li>• Improved code helper</li>
              <li>• Better context understanding</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;