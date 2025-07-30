import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Satoshi', 'system-ui', 'sans-serif'],
				'orbitron': ['Orbitron', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'xplor-yellow': 'hsl(67 80% 77%)', /* Muted Yellow E8F793 */
				'xplor-yellow-light': 'hsl(67 85% 85%)',
				'xplor-yellow-dark': 'hsl(67 75% 65%)',
				'xplor-black': 'hsl(0 0% 7%)', /* Black 121212 */
				'xplor-grey': 'hsl(235 14% 63%)', /* Gray 2 9899AC */
				'xplor-grey-light': 'hsl(235 11% 78%)', /* Gray C1C2CE */
				'dark-deep': 'hsl(200 9% 18%)', /* Dark Deep 292D32 */
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				soft: 'var(--shadow-soft)',
				medium: 'var(--shadow-medium)'
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)'
			},
			transitionProperty: {
				smooth: 'var(--transition-smooth)'
			},
			spacing: {
				'mobile-xs': 'var(--spacing-mobile-xs)',
				'mobile-sm': 'var(--spacing-mobile-sm)',
				'mobile-md': 'var(--spacing-mobile-md)',
				'mobile-lg': 'var(--spacing-mobile-lg)',
				'mobile-xl': 'var(--spacing-mobile-xl)',
				'mobile-2xl': 'var(--spacing-mobile-2xl)',
				'touch-min': 'var(--touch-target-min)',
				'touch-comfortable': 'var(--touch-target-comfortable)',
			},
			fontSize: {
				'mobile-xs': 'var(--text-mobile-xs)',
				'mobile-sm': 'var(--text-mobile-sm)',
				'mobile-base': 'var(--text-mobile-base)',
				'mobile-lg': 'var(--text-mobile-lg)',
				'mobile-xl': 'var(--text-mobile-xl)',
				'mobile-2xl': 'var(--text-mobile-2xl)',
				'mobile-3xl': 'var(--text-mobile-3xl)',
				'mobile-4xl': 'var(--text-mobile-4xl)',
			},
			minHeight: {
				'touch': 'var(--touch-target-min)',
				'touch-comfortable': 'var(--touch-target-comfortable)',
			},
			minWidth: {
				'touch': 'var(--touch-target-min)',
				'touch-comfortable': 'var(--touch-target-comfortable)',
			},
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
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
