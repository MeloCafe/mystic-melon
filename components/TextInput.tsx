import styled from '@emotion/styled'
import { ChangeEventHandler } from 'react'

import { colors } from '../styles/colors'

interface Props {
  value: string
  label?: string
  type?: 'textarea' | 'input'
  onChange: ChangeEventHandler<any>
  placeholder?: string
}

export default function Input({ type = 'input', label, ...rest }: Props) {
  return (
    <Container>
      {type === 'textarea' && <textarea rows={10} {...rest} />}
      {type === 'input' && <input {...rest} />}
      {label && <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>{label}</div>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: white;
  border: 2px solid ${colors.green300};
  border-radius: 8px;
  color: ${colors.green400};

  > input,
  textarea {
    padding: 8px;
    background: none;
    flex: 1;
  }

  > input:focus,
  textarea:focus {
    outline: none;
  }

  > input::selection,
  textarea::selection {
    background: ${colors.green300};
  }

  > div::selection {
    background: ${colors.green300};
  }
`
