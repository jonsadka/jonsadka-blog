import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import '../layouts/index.css'

const TemplateWrapper = ({ children }) => (
  <div>
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
            'personal website, blog, sadka, jon, jon sadka, visualization, front end, software engineer, portfolio, visualization, D3.js, JavaScript',
        },
        {
          name: 'theme-color',
          content: '#333333',
        },
        {
          name: 'google-site-verification',
          content: 'aGnf4yqfnIPW-BYUolkaPSjtVzXYAsQKR3pZAuxH7-E',
        },
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  </div>
)

export default TemplateWrapper
