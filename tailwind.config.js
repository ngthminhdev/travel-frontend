module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {

    extend: {
      backgroundColor: {
        'bg-color': 'rgba(45,66,113,0.77)',
        'gray-100': '#2d4271'
      },
      colors: {
        primary: {
          100: '#4d4aef',
          200: '#2d4271'
        },
        yl: {
          100: '#ffc709'
        }
      },
      scale: {
        '120': '1.2',
        '150': '1.5',
        '200': '2',
        '250': '2.5'
      },
    },
  },
  plugins: [

  ],
  corePlugins: {
    preflight: false,
  },
};
