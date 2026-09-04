module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050B18',
        card:       '#0A1628',
        surface:    '#0F1E35',
        primary:    '#3B82F6',
        secondary:  '#06B6D4',
        violet:     '#8B5CF6',
        purple:     '#A855F7',
        magenta:    '#EC4899',
        text:       '#F0F4FF',
        muted:      '#6B7FA3',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono:    ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
};
