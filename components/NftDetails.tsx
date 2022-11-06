import styled from '@emotion/styled'

import { NftDetails as NftDetailsType } from '../types'

type Props = {
  details: NftDetailsType
}

export default function NftDetails({ details }: Props) {
  if (details.type === 'UNKNOWN') return <Error>🤨 Are you sure this is an NFT? 🤨</Error>

  const { imageUrl, name, description } = details
  return (
    <Container>
      <Name>{name}</Name>
      {imageUrl && <img src={imageUrl} width="200px" style={{ borderRadius: '25px' }} />}
      {description && <div>{description}</div>}
    </Container>
  )
}

const Error = styled.div`
  color: red;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;
`
