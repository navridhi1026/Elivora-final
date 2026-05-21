import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['./index.html', 'src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  plugins: [
    require('windicss/plugin/scroll-snap'),
  ],
  shortcuts: {
    'btn-primary': 'inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-md transition-all duration-200 hover:bg-black hover:shadow-lg',
    'product-card': 'group relative overflow-hidden bg-gray-50 rounded-xl border border-gray-100 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg',
    'category-card': 'relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-102',
    'nav-link': 'text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200',
  },
  theme: {
    extend: {
      transitionProperty: {
        'transform': 'transform',
      }
    }
  }
})
