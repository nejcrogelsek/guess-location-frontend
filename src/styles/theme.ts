const theme = {
    colors: {
        dark: '#233D4d',
        green: '#619b8a',
        greenLinear: 'linear-gradient(90deg, rgba(101,158,137,1) 0%, rgba(161,193,129,1) 100%)',
        greenLinearOpacity: 'linear-gradient(90deg, rgba(101,158,137,0.6) 0%, rgba(161,193,129,0.6) 100%)',
        orangeLinear: 'linear-gradient(90deg, rgba(254,127,45,1) 0%, rgba(252,202,70,1) 100%)',
        shadow: 'rgba(50, 45, 56, 0.15)'
    },
    screens: {
        xxsmall: '@media(min-width: 414px)',
        xsmall: '@media(max-width: 576px)',
        small: "@media(min-width: 576px)",
        medium: "@media(min-width: 768px)",
        large: "@media(min-width: 992px)",
        xlarge: "@media(min-width: 1200px)",
        xxlarge: "@media(min-width: 1400px)",
        huge: "@media(min-width: 1680px)",
    }
}

export default theme