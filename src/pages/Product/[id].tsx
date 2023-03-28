import {useRouter} from 'next/router'
import { styled } from '../../styles'

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  padding: 10,
  border: 0,
  borderRadius: 5,
  color: '#fff',
  outline: 'none',

  'span': {
    marginLeft: '5rem',
  }
})

export default function Product() {
  const {query} = useRouter()

  return <Button>Enviar<span>HD</span></Button>
}