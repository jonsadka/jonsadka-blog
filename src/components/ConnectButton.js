import React from 'react'
import {styled} from 'baseui'
import {FormControl} from 'baseui/form-control'
import {Input, SIZE} from 'baseui/input'
import {Button, SIZE as BUTTON_SIZE, KIND as BUTTON_KIND} from 'baseui/button'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import {Card, StyledBody} from 'baseui/card'
import {Check} from 'baseui/icon'
import {StyledLink} from 'baseui/link'

import {withPrefix} from 'gatsby'

const ButtonWrapper = styled('div', ({$theme}) => ({
  columnGap: $theme.sizing.scale300,
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  maxWidth: '500px',
}))

const FormationsContainer = styled('div', ({$theme}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: $theme.sizing.scale600,
}))

const CheckIcon = styled('div', ({$theme}) => ({
  ...$theme.borders.border400,
  alignItems: 'center',
  borderColor: $theme.colors.borderPositive,
  borderRadius: '50%',
  display: 'flex',
  height: '24px',
  justifyContent: 'center',
  marginRight: $theme.sizing.scale400,
  position: 'absolute',
  right: '-4px',
  top: '4px',
  width: '24px',
}))

const ButtonContainer = styled('div', ({$isReady, $theme}) => ({
  marginBottom: $theme.sizing.scale800,
  ...($isReady
    ? {}
    : {
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }),
}))

export default function CustomConnectButton({nftsLoaded, ownerNFTs}) {
  return (
    <ConnectButton.Custom>
      {({account, chain, mounted, openAccountModal, openConnectModal}) => {
        const connected = mounted && account && chain

        return (
          <ButtonContainer $isReady={mounted}>
            <FormControl
              label="Wallet"
              caption="Connect your wallet holidng a Formation to redeem your matching art plots."
              error={
                nftsLoaded && !ownerNFTs.length > 0 ? (
                  <>
                    No Formations found in this wallet. Buy one on{' '}
                    <StyledLink
                      href="https://opensea.io/collection/formations-by-jon-sadka"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      OpenSea
                    </StyledLink>
                    .
                  </>
                ) : null
              }
              positive={
                nftsLoaded && ownerNFTs.length > 0
                  ? `${ownerNFTs.length} Formations found in this wallet.`
                  : null
              }
            >
              {connected ? (
                <ButtonWrapper>
                  <Input disabled size={SIZE.compact} value={account.address} />
                  <Button
                    kind={BUTTON_KIND.secondary}
                    onClick={openAccountModal}
                    size={BUTTON_SIZE.compact}
                  >
                    Disconnect
                  </Button>
                </ButtonWrapper>
              ) : (
                <div>
                  <Button size={BUTTON_SIZE.compact} onClick={openConnectModal}>
                    Connect
                  </Button>
                </div>
              )}
            </FormControl>

            {nftsLoaded ? (
              <FormationsContainer>
                {ownerNFTs.map((nftId, index) => (
                  <div key={index}>
                    <Card
                      overrides={{
                        Root: {
                          style: {
                            borderBottomWidth: '1px',
                            borderTopWidth: '1px',
                            borderLeftWidth: '1px',
                            borderRightWidth: '1px',
                            position: 'relative',
                          },
                        },
                      }}
                      headerImage={withPrefix(`gifs/formations/${nftId}.gif`)}
                    >
                      <CheckIcon>
                        <Check size="16px" color="contentPositive" />
                      </CheckIcon>
                      <StyledBody>Formation {nftId}</StyledBody>
                    </Card>
                  </div>
                ))}
              </FormationsContainer>
            ) : null}
          </ButtonContainer>
        )
      }}
    </ConnectButton.Custom>
  )
}
