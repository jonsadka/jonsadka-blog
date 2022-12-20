import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import {styled} from 'baseui'

import Layout from '../components/layout'

import '../css/blog-post.css'
import {
  HeadingXLarge,
  HeadingXXLarge,
  LabelMedium,
  ParagraphSmall,
} from 'baseui/typography'

export default function Template({data}) {
  const {markdownRemark: post} = data
  const date = new Date(Number(post.frontmatter.date))
  return post ? (
    <Layout>
      <div>
        <Helmet title={`Jon Sadka - ${post.frontmatter.title}`} />
        <div>
          <HeadingXLarge>{post.frontmatter.title}</HeadingXLarge>
          <LabelMedium>
            {date.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </LabelMedium>
          <ParagraphSmall
            className="blog-post-content"
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
          <HeadingXXLarge>Oh No!</HeadingXXLarge>
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
