import React from 'react'
import {styled} from 'baseui'
import {
  HeadingSmall,
  HeadingXSmall,
  LabelMedium,
  LabelSmall,
  ParagraphSmall,
} from 'baseui/typography'
import {Modal, ModalHeader, ModalBody, SIZE, ROLE} from 'baseui/modal'
import {Button} from 'baseui/button'
import {StaticImage} from 'gatsby-plugin-image'
import {Block} from 'baseui/block'
import {Link} from 'gatsby'

import Layout from '../components/layout'
import RequestForm from '../components/RequestForm'
import video1 from '../assets/formations/video/1.mp4'
import video2 from '../assets/formations/video/2.mp4'
import video3 from '../assets/formations/video/3.mp4'
import video4 from '../assets/formations/video/4.mp4'
import video5 from '../assets/formations/video/5.mp4'
import video6 from '../assets/formations/video/6.mp4'

const PageContainer = styled('div', {
  margin: '30px 0 60px 0',
})

const ImagesContainer = styled('div', ({$theme}) => ({
  marginBottom: $theme.sizing.scale800,

  [$theme.mediaQuery.medium]: {
    marginRight: $theme.sizing.scale1200,
    width: '500px',
  },

  [$theme.mediaQuery.large]: {
    marginRight: $theme.sizing.scale1600,
  },
}))

const ArtPrintContainer = styled('div', ({$theme}) => ({
  marginBottom: $theme.sizing.scale1600,

  [$theme.mediaQuery.medium]: {
    display: 'flex',
  },
}))

const galleryShadow =
  '2px 2px 1.6px rgba(0, 0, 0, 0.031),4.5px 4.5px 3.6px rgba(0, 0, 0, 0.045),7.9px 7.9px 6.3px rgba(0, 0, 0, 0.056),12.5px 12.5px 10px rgba(0, 0, 0, 0.065),19.3px 19.3px 15.5px rgba(0, 0, 0, 0.074),30.1px 30.1px 24.1px rgba(0, 0, 0, 0.085),50px 50px 40px rgba(0, 0, 0, 0.099),100px 100px 80px rgba(0, 0, 0, 0.13)'

const ImageDescription = styled(LabelSmall, ({$theme}) => ({
  color: $theme.colors.contentTertiary,
  marginTop: $theme.sizing.scale600,
  textAlign: 'center',
}))

const MediaGrid = styled('div', ({$theme}) => ({
  display: 'grid',
  gap: $theme.sizing.scale1600,
  marginBottom: $theme.sizing.scale2400,

  [$theme.mediaQuery.medium]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [$theme.mediaQuery.large]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}))

const UnstyledLink = styled(Link, {textDecoration: 'none'})

const ImageShadow = styled('div', ({$theme}) => ({
  border: `12px solid ${$theme.colors.backgroundPrimary}`,
  boxShadow:
    '1px 1px 1.1px rgba(0, 0, 0, 0.019),2.3px 2.3px 3.1px rgba(0, 0, 0, 0.03),4.4px 4.4px 6.7px rgba(0, 0, 0, 0.042),7.8px 7.8px 13.3px rgba(0, 0, 0, 0.054),14.6px 14.6px 26.9px rgba(0, 0, 0, 0.069),35px 35px 80px rgba(0, 0, 0, 0.1)',
}))

const MediaWrapper = styled('video', {
  aspectRatio: 1,
  boxShadow: galleryShadow,
})

function MediaGallery() {
  return (
    <MediaGrid>
      <MediaWrapper autoPlay loop width="100%" height="auto">
        <source src={video1} type="video/mp4" />
      </MediaWrapper>
      <MediaWrapper autoPlay loop width="100%" height="auto">
        <source src={video2} type="video/mp4" />
      </MediaWrapper>
      <MediaWrapper autoPlay loop width="100%" height="auto">
        <source src={video3} type="video/mp4" />
      </MediaWrapper>
      <MediaWrapper autoPlay loop width="100%" height="auto">
        <source src={video4} type="video/mp4" />
      </MediaWrapper>
      <MediaWrapper autoPlay loop width="100%" height="auto">
        <source src={video5} type="video/mp4" />
      </MediaWrapper>
      <MediaWrapper autoPlay loop width="100%" height="auto">
        <source src={video6} type="video/mp4" />
      </MediaWrapper>
    </MediaGrid>
  )
}

export default function NotFoundPage() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Layout>
      <PageContainer>
        <HeadingSmall marginBottom="scale300">Formations</HeadingSmall>
        <ParagraphSmall marginBottom="scale600" color="contentTertiary">
          <i>Self-published - December 2022</i>
        </ParagraphSmall>

        <ParagraphSmall color="contentSecondary">
          108 Formations, eroding as they reveal the underlying topology.
        </ParagraphSmall>

        <Block marginBottom="scale1200">
          <UnstyledLink
            href="https://opensea.io/collection/formations-by-jon-sadka"
            rel="noreferrer noopener"
            target="_blank"
          >
            <LabelSmall>View on OpenSea</LabelSmall>
          </UnstyledLink>
        </Block>

        <MediaGallery />

        <HeadingSmall marginBottom="scale600">Art Print</HeadingSmall>

        <ArtPrintContainer>
          <ImagesContainer>
            <div>
              <ImageShadow>
                <StaticImage
                  src="../images/formations/zoom.JPG"
                  alt="Finalized art print"
                  placeholder="blurred"
                  layout="fullWidth"
                />
              </ImageShadow>
              <ImageDescription>Macro of drawing in progress.</ImageDescription>
            </div>
          </ImagesContainer>

          <div>
            <HeadingXSmall marginBottom="scale600" marginTop="0">
              About
            </HeadingXSmall>
            <ParagraphSmall color="contentSecondary" maxWidth="400px">
              Each art print is indivudally plotted by Jon Sadka on his AxiDraw
              MiniKit, taking approximately 30 minutes to complete.
            </ParagraphSmall>
            <LabelMedium>Paper</LabelMedium>
            <ParagraphSmall color="contentSecondary" maxWidth="400px">
              Soft pillowly cotton paper, handcut to 4 in. x 6 in. from a sheet
              of 110lb Crane&apos;s Lettra.
            </ParagraphSmall>
            <LabelMedium>Pen</LabelMedium>
            <ParagraphSmall
              color="contentSecondary"
              maxWidth="400px"
              marginBottom="scale1200"
            >
              Fine line marker of the 0.2mm Pilot Razor Point II pen in black,
              blue, or red ink to match the color of the art print.
            </ParagraphSmall>

            <Button onClick={() => setIsOpen(true)}>Request Prints</Button>
          </div>
        </ArtPrintContainer>

        <HeadingSmall marginBottom="scale300">Technologies</HeadingSmall>
        <LabelMedium>Art</LabelMedium>
        <ParagraphSmall color="contentSecondary" maxWidth="400px">
          JavaScript: Drawing logic
        </ParagraphSmall>
        <ParagraphSmall color="contentSecondary" maxWidth="400px">
          canvas-sketch: Seed management, generation of art
        </ParagraphSmall>
        <LabelMedium>Media Transformations</LabelMedium>
        <ParagraphSmall color="contentSecondary" maxWidth="400px">
          ffmpeg: Compression of .mp4, conversion of mp4 to .gif
        </ParagraphSmall>
        <LabelMedium>Minting</LabelMedium>
        <ParagraphSmall color="contentSecondary" maxWidth="400px">
          Bueno: Allowlist collection, token creation, contract creation, mint
          splash page
        </ParagraphSmall>
        <LabelMedium>Hosting</LabelMedium>
        <ParagraphSmall color="contentSecondary" maxWidth="400px">
          JavaScript: Metadata creation
        </ParagraphSmall>
        <ParagraphSmall color="contentSecondary" maxWidth="400px">
          NFT.Storage: Long-term storage service for .mp4 assets
        </ParagraphSmall>

        <Modal
          onClose={() => setIsOpen(false)}
          closeable
          isOpen={isOpen}
          animate
          autoFocus
          size={SIZE.default}
          role={ROLE.dialog}
          overrides={{
            Root: {style: {zIndex: 2}},
            Dialog: {
              style: {
                maxWidth: '1280px',
                width: '80vw',
              },
            },
          }}
        >
          <ModalHeader>Art Print Request</ModalHeader>
          <ModalBody>
            <RequestForm />
          </ModalBody>
        </Modal>
      </PageContainer>
    </Layout>
  )
}
