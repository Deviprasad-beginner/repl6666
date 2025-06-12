import { Moon, Twitter, Instagram, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <h5 className="font-semibold">Nocturne</h5>
            </div>
            <p className="text-gray-400 text-sm">Where night owls gather to connect, reflect, and find community in the quiet hours.</p>
          </div>
          
          <div>
            <h6 className="font-semibold mb-4">Communities</h6>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Night Diaries</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Whispers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mind Maze</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Night Circles</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold mb-4">Support</h6>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold mb-4">Connect</h6>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Nocturne. Made with 🌙 for the night owls of the world.</p>
        </div>
      </div>
    </footer>
  );
}
