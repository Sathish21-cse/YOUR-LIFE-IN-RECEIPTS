/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090A0F",
        surface: "#12141C",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        "surface-hover": "#181B26",
        receipt: {
          paper: "#161922",
          border: "#262936",
          text: "#E2E8F0",
          muted: "#94A3B8",
          accent: "#38BDF8",
          tag: "#1E293B",
        },
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFE',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          amber: '#F59E0B',
          purple: '#A855F7',
          emerald: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        serif: ['Cinzel', 'Playfair Display', 'serif']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.25)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'receipt': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15) 0%, rgba(168, 85, 247, 0.08) 35%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
