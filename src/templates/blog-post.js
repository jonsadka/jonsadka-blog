import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'

// import '../css/blog-post.css';

const BlogTitle = styled.div`
  color: #394047;
  font-family: 'Questrial';
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 1.45rem;
`

const BlogContent = styled.div`
  color: #a3a3a3;
  line-height: 20px;
  font-size: 15px;
  font-family: 'Questrial';
  img {
    border-radius: 4px;
    display: block;
    margin: 10px auto;
    max-width: 734px;
    width: 100%;
  }
`

export default function Template({data}) {
  const {markdownRemark: post} = data
  return post ? (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`Jon Sadka - ${post.frontmatter.title}`} />
        <div className="blog-post">
          <BlogTitle>{post.frontmatter.title}</BlogTitle>
          <BlogContent
            className="blog-post-content"
            dangerouslySetInnerHTML={{__html: post.html}}
          />
        </div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`Jon Sadka`} />
        <div className="blog-post">
          <h1>Oh No!</h1>
          <div className="blog-post-content">
            We could not find the page you are looking for
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: {path: {eq: $path}, published: {ne: false}}) {
      html
      frontmatter {
        date
        path
        title
      }
    }
  }
`
