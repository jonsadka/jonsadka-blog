import React from 'react'
import {StaticImage} from 'gatsby-plugin-image'
import '../css/formations.css'
import Layout from '../components/layout'
import video1 from '../assets/formations/video/1.mp4'
import video2 from '../assets/formations/video/2.mp4'
import video3 from '../assets/formations/video/3.mp4'
import video4 from '../assets/formations/video/4.mp4'
import video5 from '../assets/formations/video/5.mp4'
import video6 from '../assets/formations/video/6.mp4'

function MediaGallery() {
  return (
    <div className="formations-media-grid">
      <video
        className="formations-media-wrapper"
        autoPlay
        loop
        width="100%"
        height="auto"
      >
        <source src={video1} type="video/mp4" />
      </video>
      <video
        className="formations-media-wrapper"
        autoPlay
        loop
        width="100%"
        height="auto"
      >
        <source src={video2} type="video/mp4" />
      </video>
      <video
        className="formations-media-wrapper"
        autoPlay
        loop
        width="100%"
        height="auto"
      >
        <source src={video3} type="video/mp4" />
      </video>
      <video
        className="formations-media-wrapper"
        autoPlay
        loop
        width="100%"
        height="auto"
      >
        <source src={video4} type="video/mp4" />
      </video>
      <video
        className="formations-media-wrapper"
        autoPlay
        loop
        width="100%"
        height="auto"
      >
        <source src={video5} type="video/mp4" />
      </video>
      <video
        className="formations-media-wrapper"
        autoPlay
        loop
        width="100%"
        height="auto"
      >
        <source src={video6} type="video/mp4" />
      </video>
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="formations-page-container">
        <h5 className="heading-small">Formations</h5>
        <p className="paragraph-small">
          <i>Self-published - December 2022</i>
        </p>
        <p className="paragraph-small">
          108 Formations, eroding as they reveal the underlying topology.
        </p>
        <div className="mb1200">
          <a
            href="https://opensea.io/collection/formations-by-jon-sadka"
            rel="noreferrer noopener"
            target="_blank"
            className="formations-unstyled-link"
          >
            <label className="label-small">View on OpenSea</label>
          </a>
        </div>
        <MediaGallery />
        <h5 className="heading-small">Art Print</h5>
        <div className="formations-artplot-container">
          <div className="formations-images-container">
            <div>
              <div className="formations-image-shadow">
                <StaticImage
                  src="../images/formations/zoom.JPG"
                  alt="Finalized art print"
                  placeholder="blurred"
                  layout="fullWidth"
                />
              </div>
              <label className="formations-image-description">
                Macro of drawing in progress.
              </label>
            </div>
          </div>

          <div>
            <h6 className="heading-xsmall">About</h6>
            <p className="paragraph-small">
              Each print is individually plotted by Jon Sadka on his AxiDraw
              MiniKit, taking approximately 30 minutes to complete.
            </p>
            <label className="label-medium">Paper</label>
            <p className="paragraph-small">
              Soft pillowly cotton paper, handcut to 4 in. x 6 in. from a sheet
              of 110lb Crane&apos;s Lettra.
            </p>
            <label className="label-medium">Pen</label>
            <p className="paragraph-small">
              Fine line marker of the 0.2mm Pilot Razor Point II pen in black,
              blue, or red ink to match the color of the Formation.
            </p>
          </div>
        </div>
        <h5 className="heading-small">Technologies</h5>
        <label className="label-medium">Art</label>
        <p className="paragraph-small">JavaScript: Drawing logic</p>
        <p className="paragraph-small">
          canvas-sketch: Seed management, generation of art
        </p>
        <label className="label-medium">Media Transformations</label>
        <p className="paragraph-small">
          ffmpeg: Compression of .mp4, conversion of mp4 to .gif
        </p>
        <label className="label-medium">Minting</label>
        <p className="paragraph-small">
          Bueno: Allowlist collection, token creation, contract creation, mint
          splash page
        </p>
        <label className="label-medium">Hosting</label>
        <p className="paragraph-small">JavaScript: Metadata creation</p>
        <p className="paragraph-small">
          NFT.Storage: Long-term storage service for .mp4 assets
        </p>
      </div>
    </Layout>
  )
}
