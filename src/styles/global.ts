import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
  },

  'body,input,textarea,select' : {
    fontFamily: 'Roboto',
    fontWeight: 400,    
  },

  ul: {
    listStyle: "none",
  },

  a: {
    textDecoration: 'none',
  },

  button: {
    cursor: 'pointer',
  }
})