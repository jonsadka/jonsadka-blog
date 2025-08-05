import React from 'react'

import Layout from '../components/layout'
import '../css/404.css'

const NotFoundPage = () => (
  <Layout>
    <div className="page-container">
      <h1 className="heading-xlarge">NOT FOUND</h1>
      <p className="paragraph-small">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
