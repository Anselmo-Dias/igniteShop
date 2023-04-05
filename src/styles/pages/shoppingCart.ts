import { styled } from "..";

export const ShoppingCartContainer = styled('article', {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 100,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  height: '100vh',

  backgroundColor: '$gray800',

  '& > div': {
    padding: '4.5rem 3rem 3rem 3rem',

    h1: {
      fontSize: '1.5rem',
      fontFamily: "'Roboto', sans-serif",
      color: '$gray100',
      marginBottom: '2rem',
    },
  }
})

export const ItemsContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    gap: 24,

})

export const Items = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,


  '& > div': {
    display: 'flex',
    flexDirection: 'column',

    strong: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1.125rem',

      color: '$gray300',
    },

    span: {
      fontSize: 18,
      color: '$gray100',
      fontFamily: 'Roboto',
      marginTop: '0.125rem',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },

    button: {
      fontFamily: 'Roboto',
      marginRight: 'auto',
      fontSize: '1rem',
      background: 'transparent',
      color: '$green300',
      border: 0,
    }
  }
})

export const PaymentsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 57,


})

export const CloseButton = styled('button', {
    position: 'absolute',
    top: 24,
    right: 24, 

    border: 0,
    backgroundColor: 'transparent',
})

export const ByProductsButton = styled('button', {
    color: '$white',
    backgroundColor: '$green500',
    border: 0,
    padding: '1.25rem 2rem',
    fontSize: '1.5rem',
    borderRadius: 8, 
})


export const BoxPayments = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 7,

  p: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

 
})
