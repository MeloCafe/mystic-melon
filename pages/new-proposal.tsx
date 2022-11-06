import { gql } from '@apollo/client'
import styled from '@emotion/styled'
import { isAddress, parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import { useProvider, useSigner } from 'wagmi'

import apolloClient from '../apollo-client'
import Input from '../components/TextInput'
import { getVaultContract } from '../contracts'
import { uploadText } from '../lib/ipfs'
import { colors } from '../styles/colors'
import { Vault } from '../types'

const BLOCK_DEADLINE = 100

export default function NewProposal({ vaults, defaultVault }: { vaults: Vault[]; defaultVault?: string }) {
  const { data: signer } = useSigner()
  const provider = useProvider()

  const [form, setForm] = useState({
    title: '',
    description: '',
    transactionTo: '',
    transactionValue: '',
  })

  const [submissionError, setSubmissionError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const vaultOptions = vaults.map((vault) => ({ value: vault.id, label: `${vault.name} (${vault.id})` }))
  const [selectedVault, setSelectedVault] = useState<string | undefined>(defaultVault ?? vaultOptions?.[0].value)

  const onFormChange = (field: string) => (e: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleOptionChange = (event: any) => {
    setSubmissionError(false)
    setSelectedVault(event.target.value)
  }

  const onSubmit = () => {
    async function submit() {
      if (!signer || !selectedVault || !provider) return
      try {
        setSubmitting(true)
        const ipfsRes = await uploadText(form.description)
        const vaultContract = getVaultContract(signer, selectedVault)
        const currentBlock = await provider.getBlockNumber()

        const etherValue = parseEther(form.transactionValue).toString()
        const res = await vaultContract.propose({
          title: form.title,
          descriptionHash: ipfsRes.cid,

          // default to Transfer transaction
          transactions: [{ to: form.transactionTo, value: etherValue, data: '0x', gas: 27000 }],
          endBlock: currentBlock + BLOCK_DEADLINE,
        })

        await res.wait()
      } catch (e) {
        setSubmissionError(true)
      }

      setSubmitting(false)
    }

    submit()
  }

  const submitDisabled =
    !form.title ||
    !selectedVault ||
    !form.description ||
    !isAddress(form.transactionTo) ||
    !form.transactionValue ||
    !signer ||
    submitting

  return (
    <div className="w-full h-full min-h-screen flex flex-col" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
      <FormContainer>
        <Title>New proposal</Title>
        <div>
          Title:
          <Input type="input" placeholder="Very cool proposal" value={form.title} onChange={onFormChange('title')} />
        </div>
        <div>
          Only members of this Vault can vote:
          <select value={selectedVault} onChange={handleOptionChange}>
            {vaultOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
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
            inputType="number"
            placeholder="0.01"
            value={form.transactionValue}
            onChange={onFormChange('transactionValue')}
            label="ETH"
          />
        </div>
        <Submit disabled={submitDisabled} onClick={onSubmit}>
          {signer ? (submitting ? 'Submitting' : 'Submit') : 'Connect your wallet'}
        </Submit>
        {submissionError && <div>There was an error 🤮</div>}
      </FormContainer>
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query Vaults {
        vaults {
          id
          name
        }
      }
    `,
  })

  return {
    props: {
      vaults: data.vaults,
      defaultVault: query.vault_id ?? null,
    },
  }
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
  max-width: 500px;
  width: 60%;
  color: ${colors.green400};
  padding-bottom: 64px;

  > div {
    display: flex;
    flex-flow: column;
    &::selection {
      background: ${colors.green300};
    }
  }

  select {
    padding: 8px;
    background-color: white;
    border: 2px solid ${colors.green300};
    border-radius: 8px;
    color: ${colors.green400};
  }

  select:focus {
    outline: none;
    border: 2px solid ${colors.green400};
  }

  @media only screen and (max-width: 900px) {
    width: 90%;
  }
`

const Submit = styled.button`
  margin-top: 12px;
  background-color: ${colors.yellow100};
  padding: 12px;
  border-radius: 25px;
  text-align: center;
  border: 3px solid ${colors.yellow400};
  font-weight: 600;
  font-size: 24px;

  &:disabled {
    background-color: ${colors.gray100};
    border: 3px solid ${colors.gray300};
    color: ${colors.gray400};
  }

  &:disabled:hover {
    transform: none;
  }

  &:hover {
    transform: scale(1.05);
    transition-duration: 0.2s;
  }

  transition-duration: 0.2s;
`
