module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#EAF2D7',
        card:       '#F4F8EC',
        surface:    '#DFEAC5',
        primary:    '#8B5796',
        secondary:  '#9C6BA8',
        violet:     '#8B5796',
        purple:     '#6E387B',
        magenta:    '#A26EA6',
        text:       '#3D1A47',
        muted:      '#6F5179',
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
