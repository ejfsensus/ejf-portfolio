/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0C',
        ink: '#111114',
        ash: '#1A1A1F',
        bone: '#F4F1EC',
        parchment: '#E8E4DC',
        indigoDeep: '#2B2A63',
        plum: '#4A2E5A',
        ember: '#D97A4A',
        prism: '#3FB8B0',
        rose: '#E08BA2',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Fraunces', 'ui-serif', 'Georgia'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
