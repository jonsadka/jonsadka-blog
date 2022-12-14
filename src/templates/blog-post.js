import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import {styled} from 'baseui'

import Layout from '../components/layout'

import '../css/blog-post.css'

const BlogTitle = styled('div', {
  color: '#394047',
  fontFamily: 'Questrial',
  fontSize: '36px',
  lineHeight: '44px',
  marginBottom: '0.5rem',
})

const BlogDate = styled('div', {
  color: '#394047',
  fontFamily: 'Questrial',
  fontSize: '28',
  marginBottom: '1.45rem',
})

const BlogContent = styled('div', {
  color: '#a3a3a3',
  lineHeight: '20px',
  fontSize: '15px',
  fontFamily: 'Questrial',
})

export default function Template({data}) {
  const {markdownRemark: post} = data
  const date = new Date(Number(post.frontmatter.date))
  return post ? (
    <Layout>
      <div>
        <Helmet title={`Jon Sadka - ${post.frontmatter.title}`} />
        <div>
          <BlogTitle>{post.frontmatter.title}</BlogTitle>
          <BlogDate>
            {date.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </BlogDate>
          <BlogContent
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
          <h1>Oh No!</h1>
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
