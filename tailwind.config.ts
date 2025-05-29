// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark-gray': '#333333',
        'brand-purple': '#7E5BEF',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
        extrabold: '800',  // add this
        black: '900',      // also add black for max boldness
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

export default config
