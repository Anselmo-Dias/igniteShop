import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',

  background:'#000',
  color: 'white',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    position: 'relative',
    background: '$gray800', 
    padding: '0.75rem',
    borderRadius: 6,
    border: 0,

    span : {
      position: 'absolute',
      right: 0,
      top: 0,
      height:25,
      width:25,
      padding: '5px 5px',
      borderRadius: 999,
      backgroundColor: '$green300',
      transform: 'translateY(-10px)',
    }
  }
})