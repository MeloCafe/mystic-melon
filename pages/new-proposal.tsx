import styled from '@emotion/styled'
import { useState } from 'react'
import { useAccount } from 'wagmi'

import Input from '../components/TextInput'
import { colors } from '../styles/colors'

export default function NewProposal() {
  const { address } = useAccount()

  const [form, setForm] = useState({
    title: '',
    nftContractAddress: '',
    description: '',
    transactionTo: '',
    transactionValue: '',
  })

  const onFormChange = (field: string) => (e: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
      <FormContainer>
        <Title>New proposal</Title>
        <div>
          Title:
          <Input type="input" placeholder="Very cool proposal" value={form.title} onChange={onFormChange('title')} />
        </div>
        <div>
          Only owners of this NFT address can vote:
          <Input
            type="input"
            placeholder="0x123..."
            value={form.nftContractAddress}
            onChange={onFormChange('nftContractAddress')}
          />
        </div>
        <div>
          Description:
          <Input
            type="textarea"
            placeholder="Very cool description here"
            value={form.description}
            onChange={onFormChange('description')}
          />
        </div>
        <div>
          This is a proposal to send funds to:
          <Input
            type="input"
            placeholder="0x123.."
            value={form.transactionTo}
            onChange={onFormChange('transactionTo')}
          />
        </div>
        <div>
          Amount to send:
          <Input
            type="input"
            placeholder="0.01"
            value={form.transactionValue}
            onChange={onFormChange('transactionValue')}
            label="ETH"
          />
        </div>
        <Submit onClick={() => null}>Submit</Submit>
      </FormContainer>
    </div>
  )
}

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
`

const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: stretch;
  align-self: center;
  gap: 12px;
  width: 500px;
  color: ${colors.green400};
  padding-bottom: 64px;

  > div {
    display: flex;
    flex-flow: column;
    &::selection {
      background: ${colors.green300};
    }
  }
`

const Submit = styled.button`
  background-color: ${colors.yellow100};
  padding: 12px;
  border-radius: 25px;
  text-align: center;
  border: 3px solid ${colors.yellow400};
  font-weight: 600;
  font-size: 24px;

  &:hover {
    transform: scale(1.05);
    transition-duration: 0.2s;
  }

  transition-duration: 0.2s;
`
