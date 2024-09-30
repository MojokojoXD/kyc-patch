/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    mode: "jit",
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
      "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		gridTemplateColumns: {
    			'6': 'repeat(6, minmax(0, 1fr))',
    			'13': 'repeat(13, minmax(0, 1fr))',
    			'14': 'repeat(14, minmax(0, 1fr))'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	},
    	colors: {
    		white: '#FFFFFF',
    		black: '#000000',
    		'black-100': '#09101D',
    		'neutral-50': '#F7F9FC',
    		'neutral-100': '#E8EEF7',
    		'neutral-200': '#D2DDEE',
    		'neutral-300': '#BBCCE6',
    		'neutral-400': '#A4BBDD',
    		'neutral-500': '#365B91',
    		'neutral-600': '#29446D',
    		'neutral-700': '#1B2D49',
    		'neutral-800': '#0E1724',
    		'neutral-900': '#070B12',
    		'primary-50': '#F5F5FE',
    		'primary-100': '#E2E2FD',
    		'primary-200': '#C6C6FB',
    		'primary-300': '#A9A9F9',
    		'primary-400': '#8C8CF7',
    		'primary-500': '#4040F2',
    		'primary-600': '#0F0FD7',
    		'primary-700': '#0A0A8F',
    		'primary-800': '#050548',
    		'primary-900': '#020224',
    		'success-50': '#F0FFF7',
    		'success-100': '#D1FEE8',
    		'success-200': '#A3FCD1',
    		'success-300': '#74FBBA',
    		'success-400': '#46F9A3',
    		'success-500': '#06BA63',
    		'success-600': '#058B4A',
    		'success-700': '#035D32',
    		'success-800': '#022F19',
    		'success-900': '#01170C',
    		'warning-50': '#FFFAF2',
    		'warning-100': '#FFEFD8',
    		'warning-200': '#FFE0B0',
    		'warning-300': '#FFD089',
    		'warning-400': '#FFC062',
    		'warning-500': '#F89500',
    		'warning-600': '#BA7000',
    		'warning-700': '#7C4A00',
    		'warning-800': '#3E2500',
    		'warning-900': '#1F1300',
    		'error-50': '#FFF2F2',
    		'error-100': '#FFD8D8',
    		'error-200': '#FFB0B0',
    		'error-300': '#FF8989',
    		'error-400': '#FF6262',
    		'error-500': '#F80000',
    		'error-600': '#BA0000',
    		'error-700': '#7C0000',
    		'error-800': '#3E0000',
    		'error-900': '#1F0000'
    	}
    },
    safelist: [
      "grid-cols-1",
      "grid-cols-2",
      "grid-cols-3",
      "grid-cols-4",
      "grid-cols-5",
      "grid-cols-6",
      "grid-cols-7",
      "grid-cols-8",
      "grid-cols-9",
      "grid-cols-10",
      "grid-cols-11",
      "grid-cols-12",
      "grid-cols-13",
      "grid-cols-14",
    ],
    plugins: [require("tailwindcss-animate")],
  };
  