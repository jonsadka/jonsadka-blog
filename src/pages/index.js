import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabcase'
import styled from 'styled-components'

// import '../css/index.css';

const DEFAULT_MARGIN = 30
const SMALL_THUMBNAIL_HEIGHT = 100

import { LARGER_WORKS } from '../works/larger-works'

const BlogPreview = styled.div`
  margin-bottom: ${DEFAULT_MARGIN}px;
`

const BlogMetadata = styled.div`
  color: #a3a3a3;
  display: inline-block;
  font-size: 12px;
  margin-bottom: 5px;
`

const BlogTag = styled(Link)`
  color: #a3a3a3;
  display: inline-block;
  font-size: 12px;
  padding-right: 10px;
  transition: color 0.2s;
  &:hover {
    color: black;
  }
`

const MiddleDot = styled.span`
  font-size: 12px;
  padding: 0 10px;
`

const ReadLink = styled(Link)`
  display: block;
  font-size: 12px;
  letter-spacing: 0.05rem;
  margin-bottom: 60px;
  margin-top: ${DEFAULT_MARGIN}px;
`

const WorksSection = styled.div`
  margin: ${DEFAULT_MARGIN}px 0 60px 0;
`

const LargerWorksCarousel = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
`

const SmallerWorksCarousel = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
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
  overflow: hidden;
  width: ${props => (props.size === 'larger' ? '367px' : '184px')};
`

const WorkDetails = styled.div`
  padding: ${DEFAULT_MARGIN}px;
`

const WorkTitle = styled.a`
  color: black;
  display: block;
  margin-bottom: ${DEFAULT_MARGIN}px;
`

const WorkTitleLink = styled(Link)`
  color: black;
  display: block;
  margin-bottom: ${DEFAULT_MARGIN}px;
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
    const { data, pathContext } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const { gistsList } = pathContext
    return (
      <div>
        <WorksSection>
          <h2>Larger Works</h2>
          <LargerWorksCarousel>
            {LARGER_WORKS.sort((a, b) => b.createdAt - a.createdAt).map(
              work => (
                <LargerWorks key={work.url}>
                  <Thumbnail size={'larger'}>
                    <a href={work.url} target="_blank">
                      <img alt={work.title} src={withPrefix(work.thumbnail)} />
                    </a>
                  </Thumbnail>
                  <WorkDetails>
                    <BlogMetadata>{formatData(work.createdAt)}</BlogMetadata>
                    <WorkTitle href={work.url} target="_blank">
                      {work.title}
                    </WorkTitle>
                    <WorkDescription>{work.description}</WorkDescription>
                  </WorkDetails>
                </LargerWorks>
              )
            )}
          </LargerWorksCarousel>
        </WorksSection>

        <WorksSection>
          <h2>Smaller Works</h2>
          {false && (
            <Tabs>
              <Tab onClick={console.log} selected={true}>
                All Sources
              </Tab>
              <Tab onClick={console.log}>Bl.ocks</Tab>
              <Tab onClick={console.log}>Observable</Tab>
            </Tabs>
          )}
          <SmallerWorksCarousel>
            {gistsList.map((gist, i) => (
              <SmallerWorks key={i}>
                <Thumbnail size={'smaller'}>
                  <a
                    href={`https://bl.ocks.org/jonsadka/${gist.id}`}
                    target="_blank"
                  >
                    <img
                      style={{ marginLeft: '-5px' }}
                      height={'100px'}
                      alt={gist.description}
                      src={gist.files['thumbnail.png'].raw_url}
                    />
                  </a>
                </Thumbnail>
              </SmallerWorks>
            ))}
          </SmallerWorksCarousel>
        </WorksSection>

        <WorksSection>
          <h2>Written Works</h2>
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
                key={tab.id}
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
                        <BlogTag to={`/tags/${kebabCase(tag)}`} key={tag}>
                          {tag}
                        </BlogTag>
                      ))}
                    </BlogMetadata>
                    <WorkTitleLink to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </WorkTitleLink>
                    <p>{post.excerpt}</p>
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
