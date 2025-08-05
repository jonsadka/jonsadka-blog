import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import '../css/blog-post.css'

export default function Template({data}) {
  const {markdownRemark: post} = data
  const date = new Date(Number(post.frontmatter.date))
  return post ? (
    <Layout>
      <div>
        <Helmet title={`Jon Sadka - ${post.frontmatter.title}`} />
        <div>
          <h1 className="heading-xlarge">{post.frontmatter.title}</h1>
          <label className="label-medium">
            {date.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </label>
          <div
            className="blog-post-content paragraph-small"
            dangerouslySetInnerHTML={{__html: post.html}}
          />
        </div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div>
        <Helmet title="Jon Sadka" />
        <div>
          <h1 className="heading-xxlarge">Oh No!</h1>
          <div>We could not find the page you are looking for</div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($pagePath: String!) {
    markdownRemark(
      frontmatter: {path: {eq: $pagePath}, published: {eq: true}}
    ) {
      html
      frontmatter {
        date
        path
        title
      }
    }
  }
`
