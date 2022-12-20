import React, {useEffect, useState} from 'react'
import {styled} from 'baseui'
import {HeadingXSmall, LabelXSmall, ParagraphMedium} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {Input, SIZE} from 'baseui/input'
import {Textarea} from 'baseui/textarea'
import {Button} from 'baseui/button'
import {StyledLink} from 'baseui/link'
import {useFormspark} from '@formspark/use-formspark'
import {Tag, KIND, VARIANT} from 'baseui/tag'
import {Check} from 'baseui/icon'
import {darkTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit'
import {useAccount, WagmiConfig} from 'wagmi'
import {ethers, utils} from 'ethers'
import {merge} from 'lodash'

import {chains, wagmiClient} from './wallet-config'
import {DarkTheme} from './theme'
import CustomConnectButton from './ConnectButton'
import jsonInterface from './formations-abi.json'

const FORMSPARK_FORM = 'WEvn2UzB'

function NameLabel() {
  return (
    <>
      Name{' '}
      <Tag
        overrides={{
          Root: {
            style: ({$theme}) => ({
              color: $theme.colors.contentTertiary,
              backgroundColor: $theme.colors.backgroundTertiary,
              borderBottomLeftRadius: '6px',
              borderBottomRightRadius: '6px',
              borderTopRightRadius: '6px',
              borderTopLeftRadius: '6px',
            }),
          },
        }}
        closeable={false}
        kind={KIND.neutral}
        variant={VARIANT.solid}
        es
      >
        Optional
      </Tag>
    </>
  )
}

const ConfirmLabel = styled('div', ({$theme}) => ({
  display: 'flex',
  marginBottom: $theme.sizing.scale300,
  marginTop: $theme.sizing.scale600,
}))

const CheckIcon = styled('div', ({$theme}) => ({
  borderRadius: '50%',
  backgroundColor: $theme.colors.backgroundLightPositive,
  marginRight: $theme.sizing.scale400,
  height: '33px',
}))

const provider = new ethers.providers.EtherscanProvider(
  'homestead',
  'QAT3X85RSEH2XQDZRWJCDA3CCM3VD3FDUB'
)

async function getWalletNFTs(wallet) {
  const formationsContract = '0xE93cEdFD0F1b5882152F070874908847052EF3b3'
  const abi = new utils.Interface(jsonInterface)
  const contract = new ethers.Contract(formationsContract, abi, provider)
  const resp = await contract.tokensOfOwner(wallet)
  return resp.map((nftId) => ethers.utils.formatUnits(nftId, 0))
}

function UnconnectedRequestForm() {
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [ownerNFTs, setOwnerNFTs] = useState(null)
  const {address: wallet} = useAccount()

  const [submit, submitting] = useFormspark({formId: FORMSPARK_FORM})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!wallet) {
      setOwnerNFTs(null)
      return
    }

    async function getNFTs() {
      // '0x7ef61cacd0c785eacdfe17649d1c5bcba676a858'
      const resp = await getWalletNFTs(wallet)
      setOwnerNFTs(resp)
    }
    getNFTs()
  }, [wallet])

  const nftsLoaded = Array.isArray(ownerNFTs)

  const onSubmit = async (e) => {
    e.preventDefault()
    await submit({
      address: JSON.stringify(address),
      ids: ownerNFTs,
      name,
      wallet,
    })
    setSubmitted(true)
  }

  return (
    <>
      {submitted ? (
        <div>
          <ConfirmLabel>
            <CheckIcon>
              <Check color="positive" size="33px" />
            </CheckIcon>
            <div>
              <HeadingXSmall margin={0}>Recieved</HeadingXSmall>
              <ParagraphMedium color="contentSecondary" margin={0}>
                Print will be mailed out in 1-2 weeks.
              </ParagraphMedium>
            </div>
          </ConfirmLabel>
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <CustomConnectButton
              nftsLoaded={nftsLoaded}
              ownerNFTs={ownerNFTs}
            />
            <FormControl label={NameLabel}>
              <Input
                disabled={submitting}
                onChange={(e) => setName(e.target.value)}
                overrides={{Root: {style: {maxWidth: '500px'}}}}
                size={SIZE.compact}
                value={name}
              />
            </FormControl>
            <FormControl label="Mailing Address">
              <Textarea
                disabled={submitting}
                onChange={(e) => setAddress(e.target.value)}
                overrides={{Root: {style: {maxWidth: '500px'}}}}
                size={SIZE.compact}
                value={address}
              />
            </FormControl>
            <Button
              overrides={{
                BaseButton: {style: {width: '100%', maxWidth: '500px'}},
              }}
              disabled={
                submitting || !address || !wallet || !ownerNFTs?.length > 0
              }
              isLoading={submitting}
            >
              Submit
            </Button>
            <LabelXSmall marginTop="scale300" color="contentTertiary">
              NOTE: Submissions are emailed to me using{' '}
              <StyledLink
                href="https://formspark.io/legal/terms-of-service/"
                rel="noreferrer noopener"
                target="_blank"
              >
                Formspark
              </StyledLink>
              .
            </LabelXSmall>
          </form>
        </>
      )}
    </>
  )
}

export default function RequestForm() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={merge(darkTheme(), {
          colors: {
            accentColor: DarkTheme.colors.accent,
            accentColorForeground: DarkTheme.colors.contentPrimary,
            error: DarkTheme.colors.negative,
          },
          radii: {
            actionButton: DarkTheme.borders.radius300,
            connectButton: DarkTheme.borders.radius300,
            menuButton: DarkTheme.borders.radius300,
            modal: DarkTheme.borders.radius300,
            modalMobile: DarkTheme.borders.radius300,
          },
          fonts: {
            body: 'Questrial',
          },
          shadows: {
            connectButton: null,
          },
        })}
        chains={chains}
      >
        <UnconnectedRequestForm />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
