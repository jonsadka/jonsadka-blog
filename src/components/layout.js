import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import '../layouts/index.css'
import './layout.css'
import '../css/typography.css'

const TemplateWrapper = ({children}) => {
  return (
    <>
      <Helmet
        title="Jon Sadka Personal Website and Blog"
        meta={[
          {
            name: 'description',
            content: "Jon Sadka's Personal Website and Blog",
          },
          {
            name: 'keywords',
            content:
              'personal website, blog, sadka, jon, jon sadka, data visualization, visualization, front end, frontend, engineering, software engineer, portfolio, visualization, D3.js, JavaScript',
          },
          {
            name: 'theme-color',
            content: '#fff',
          },
          {
            name: 'google-site-verification',
            content: 'aGnf4yqfnIPW-BYUolkaPSjtVzXYAsQKR3pZAuxH7-E',
          },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <div className="background">
        <Header />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1280,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default TemplateWrapper
