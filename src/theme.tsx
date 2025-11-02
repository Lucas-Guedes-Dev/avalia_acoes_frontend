const theme = {
    colors: {
        background: '#0a0a0a',
        primary: '#00b37e',
        secondary: '#1f1f1f',
        text: '#f5f5f5',
        danger: '#ff4d4f',
        warning: '#ffb02e',
        success: '#00b37e',
        info: '#0ea5e9',
        border: '#333333',
        input: '#1a1a1a',
    },
    gradients: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        primary: 'linear-gradient(135deg, #023f2d 0%, #01a16c 100%)',
        strongPrimary: 'linear-gradient(135deg, #00b37e 0%, #00d68f 100%)',
        danger: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
        warning: 'linear-gradient(135deg, #ffb02e 0%, #ffc53d 100%)',
        info: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
        inputFocus: 'linear-gradient(135deg, #00b37e 0%, #00d68f 100%)',
        card1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        card2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        card3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
};

export type ThemeType = typeof theme;

export default theme;