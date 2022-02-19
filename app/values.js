export const basename = process.env.NODE_ENV === 'production' ? '/lukkari' : ''
export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://jtthaavi.kapsi.fi/subrosa/lukkari' : 'http://localhost:3000'
