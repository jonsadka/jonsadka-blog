import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

// import '../css/index.css';

import styled from 'styled-components';

const BlogPreview = styled.div`
  margin-bottom: 40px;
`;

const BlogDate = styled.div`
  color: #394047;
  display: inline-block;
  font-family: 'Libre Franklin';
  font-size: 10px;
  font-weight: 700;
  padding-right: 8px;
  text-transform: uppercase;
`;

const BlogTag = styled(Link)`
  color: #F5AA2D;
  display: inline-block;
  font-family: 'Libre Franklin';
  font-size: 10px;
  font-weight: 700;
  padding-right: 8px;
  text-decoration: none;
  text-transform: uppercase;
`;

const BlogTitle = styled(Link)`
  color: #394047;
  font-family: 'Libre Franklin';
  font-size: 24px;
  text-decoration: none;
`;

const MiddleDot = styled.span`
  font-size: 10px;
  font-family: 'Libre Franklin';
  font-weight: 700;
  padding-right: 8px;
`

const BlogExcerpt = styled.div`
  color: gray;
  line-height: 20px;
  font-size: 14px;
  font-family: 'Libre Franklin';
`

const ReadLink = styled(Link)`
  color: #0B92F3;
  font-family: 'Libre Franklin';
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
`

// Utilities
import kebabCase from 'lodash/kebabcase'

function formatData(ts) {
  const date = new Date(Number(ts))
  const month = date.getMonth() + 1;
  const monthIndexToMonthText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return monthIndexToMonthText[month] + ' ' +  date.getFullYear()
}

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <BlogPreview key={post.id}>
              <BlogDate>{formatData(post.frontmatter.date)}</BlogDate>
              <MiddleDot>&#183;</MiddleDot>
              {post.frontmatter.tags.map(tag =>
                <BlogTag to={`/tags/${kebabCase(tag)}`}>
                  {tag}
                </BlogTag>
              )}
              <div>
                <BlogTitle to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </BlogTitle>
              </div>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <ReadLink to={post.frontmatter.path}>Read</ReadLink>
            </BlogPreview>
          )
        })}
      <BlogTag to="/tags/">See all tags</BlogTag>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { published: { ne: false } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date
            tags
            path
          }
        }
      }
    }
  }
`
