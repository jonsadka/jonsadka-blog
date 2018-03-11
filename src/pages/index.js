import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabcase'

// import '../css/index.css';

import styled from 'styled-components'

const DEFAULT_MARGIN = 30
const SMALL_THUMBNAIL_HEIGHT = 100

const BlogPreview = styled.div`
  margin-bottom: ${DEFAULT_MARGIN}px;
`

const BlogMetadata = styled.div`
  color: #a3a3a3;
  display: inline-block;
  font-family: 'Questrial';
  font-size: 12px;
  margin-bottom: 5px;
`

const BlogTag = styled(Link)`
  color: #a3a3a3;
  display: inline-block;
  font-family: 'Questrial';
  font-size: 12px;
  padding-right: 10px;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: black;
  }
`

const MiddleDot = styled.span`
  font-size: 12px;
  font-family: 'Questrial';
  padding: 0 10px;
`

const BlogExcerpt = styled.div`
  color: #a3a3a3;
  margin-top: ${DEFAULT_MARGIN}px;
  font-size: 14px;
  font-family: 'Questrial';
`

const ReadLink = styled(Link)`
  color: #1644ce;
  display: block;
  font-family: 'Questrial';
  font-size: 12px;
  letter-spacing: 0.05rem;
  margin-bottom: 60px;
  margin-top: ${DEFAULT_MARGIN}px;
  text-decoration: none;
`

const WorksSection = styled.div`
  font-family: 'Questrial';
  margin: ${DEFAULT_MARGIN}px 0 60px 0;
`

const WorksTitle = styled.div`
  font-family: 'Questrial';
  font-size: 28px;
  letter-spacing: 0.05rem;
  margin-bottom: ${DEFAULT_MARGIN}px;
`
const LargerWorksCarousel = styled.div`
  overflow: scroll;
  white-space: nowrap;
`

const SmallerWorksCarousel = styled.div`
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: ${SMALL_THUMBNAIL_HEIGHT +
    2 * (SMALL_THUMBNAIL_HEIGHT + DEFAULT_MARGIN)}px;
  white-space: nowrap;
`

const LargerWorks = styled.div`
  display: inline-block;
  margin-right: ${DEFAULT_MARGIN}px;
  vertical-align: top;
  width: 367px;
`

const SmallerWorks = styled.div`
  &:not(:nth-child(3n)) {
    margin-bottom: ${DEFAULT_MARGIN}px;
  }
  margin-right: ${DEFAULT_MARGIN}px;
  display: inline-block;
`

const Thumbnail = styled.div`
  background-color: #b2c5d4;
  border-radius: 4px;
  height: ${props =>
    props.size === 'larger' ? '200px' : `${SMALL_THUMBNAIL_HEIGHT}px`};
  width: ${props => (props.size === 'larger' ? '367px' : '184px')};
`

const WorkDetails = styled.div`
  padding: ${DEFAULT_MARGIN}px;
  font-family: 'Questrial';
`

const WorkTitle = styled(Link)`
  color: black;
  display: block;
  margin-bottom: ${DEFAULT_MARGIN}px;
  text-decoration: none;
`

const WorkDescription = styled.div`
  color: #a3a3a3;
  font-size: 12px;
  white-space: normal;
`

const Tabs = styled.ul`
  margin-left: 0;
  margin-bottom: ${DEFAULT_MARGIN}px;
`

const Tab = styled.li`
  color: ${props => (props.selected ? 'black' : '#A3A3A3')};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin-right: ${DEFAULT_MARGIN}px;
  min-width: ${DEFAULT_MARGIN}px;
  transition: color 0.2s;
  &:hover {
    color: black;
  }
`

function formatData(ts) {
  const date = new Date(Number(ts))
  const month = date.getMonth()
  const monthIndexToMonthText = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthIndexToMonthText[month] + ' ' + date.getFullYear()
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      writtenWorkTag: 'all',
    }
  }

  _filterWrittenWork(tag) {
    this.setState({ writtenWorkTag: tag || 'JavaScript' })
  }

  render() {
    const { writtenWorkTag } = this.state
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <div>
        {false && (
          <WorksSection>
            <WorksTitle>Larger Works</WorksTitle>
            <LargerWorksCarousel>
              {new Array(10).fill('').map((d, i) => (
                <LargerWorks>
                  <Thumbnail size={'larger'} />
                  <WorkDetails>
                    <WorkTitle>
                      Larger Work No. {Math.round(Math.random() * 1000)}
                    </WorkTitle>
                    <WorkDescription>
                      This is a once sentence description of what this project
                      is because I want this word wrap to show me how its done
                    </WorkDescription>
                  </WorkDetails>
                </LargerWorks>
              ))}
            </LargerWorksCarousel>
          </WorksSection>
        )}

        {false && (
          <WorksSection>
            <WorksTitle>Smaller Works</WorksTitle>
            <Tabs>
              <Tab onClick={console.log} selected={true}>
                All Sources
              </Tab>
              <Tab onClick={console.log}>Bl.ocks</Tab>
              <Tab onClick={console.log}>Observable</Tab>
            </Tabs>
            <SmallerWorksCarousel>
              {new Array(30).fill('').map((d, i) => (
                <SmallerWorks>
                  <Thumbnail size={'smaller'} />
                </SmallerWorks>
              ))}
            </SmallerWorksCarousel>
          </WorksSection>
        )}

        <WorksSection>
          <WorksTitle>Written Works</WorksTitle>
          <Tabs>
            {[
              { id: 'all', text: 'All Tags' },
              { id: 'API', text: 'API' },
              { id: 'D3.js', text: 'D3.js' },
              { id: 'JavaScript', text: 'JavaScript' },
              { id: 'jQuery', text: 'jQuery' },
              { id: 'MongoDB', text: 'MongoDB' },
              { id: 'UX / UI', text: 'UX / UI' },
            ].map(tab => (
              <Tab
                selected={tab.id === writtenWorkTag}
                onClick={() => this._filterWrittenWork(tab.id)}
              >
                {tab.text}
              </Tab>
            ))}
          </Tabs>
          <div className="blog-posts">
            {posts
              .filter(post => post.node.frontmatter.title.length > 0)
              .filter(
                post =>
                  writtenWorkTag === 'all' ||
                  post.node.frontmatter.tags.includes(writtenWorkTag)
              )
              .map(({ node: post }) => {
                return (
                  <BlogPreview key={post.id}>
                    <BlogMetadata>
                      {formatData(post.frontmatter.date)}
                      <MiddleDot>/</MiddleDot>
                      {post.frontmatter.tags.map(tag => (
                        <BlogTag to={`/tags/${kebabCase(tag)}`}>{tag}</BlogTag>
                      ))}
                    </BlogMetadata>
                    <WorkTitle to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </WorkTitle>
                    <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                    <ReadLink to={post.frontmatter.path}>Read</ReadLink>
                  </BlogPreview>
                )
              })}
            <BlogTag to="/tags/">See all tags</BlogTag>
          </div>
        </WorksSection>
      </div>
    )
  }
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
