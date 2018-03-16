import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import './index.css'

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
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
