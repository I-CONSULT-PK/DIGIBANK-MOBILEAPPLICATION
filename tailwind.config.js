/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{html,js,jsx,ts,tsx}", "./screens/**/*.{html,js,jsx,ts,tsx}", "./components/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    
    fontFamily: {
      'sans': ['InterRegular'],
      'InterBlack': ['InterBlack'],
      'InterBold': ['InterBold'],
      'InterMedium': ['InterMedium'],
      'InterSemiBold': ['InterSemiBold'],
      'InterRegular' : ['InterRegular'],
    },
    extend: {
      colors: {
        'primary': '#1DBBD8',
        'secondary': '#8EEDFF',
        'primary-dark': '#0097A7',
        'primary-light': '#18CBEB',
        'blue':'#2665ED',
        'text-gray':'#868889',
        'background':'#F4F5F9',
        'theme-colour': '#0F98B0',
        'theme-colourr': '#1EBBD7',
      },
    },
  },
  plugins: [],
};

