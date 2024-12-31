export const theme = {
    colors: {
        primary: {
            DEFAULT: 'hsl(var(--primary))',
            hover: 'hsl(var(--primary-hover))',
            foreground: 'hsl(var(--primary-foreground))',
        },
        node: {
            input: {
                bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
                border: 'border-blue-400',
                icon: 'text-blue-600',
            },
            llm: {
                bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
                border: 'border-purple-400',
                icon: 'text-purple-600',
            },
            text: {
                bg: 'bg-gradient-to-br from-green-50 to-green-100',
                border: 'border-green-400',
                icon: 'text-green-600',
            },
            output: {
                bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
                border: 'border-orange-400',
                icon: 'text-orange-600',
            },
            transform: {
                bg: 'bg-gradient-to-br from-pink-50 to-pink-100',
                border: 'border-pink-400',
                icon: 'text-pink-600',
            },
            calculation: {
                bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
                border: 'border-yellow-400',
                icon: 'text-yellow-600',
            },
            decision: {
                bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
                border: 'border-purple-400',
                icon: 'text-purple-600',
            },
        },
    },
    shadows: {
        node: 'shadow-lg hover:shadow-xl transition-shadow duration-200',
    },
}