import React from 'react'
import {graphql, Link, withPrefix} from 'gatsby'
import kebabCase from 'lodash/kebabcase'
import styled from 'styled-components'
import {OutboundLink} from 'gatsby-plugin-google-analytics'

import Layout from '../components/layout'
import {LARGER_WORKS} from '../works/larger-works'

// import '../css/index.css';

const DEFAULT_MARGIN = 30
const SMALL_THUMBNAIL_HEIGHT = 100
const SCROLL_BAR_HEIGHT = 20

const BLOCKS_ID = 'blocks'
const OBSERVABLE_ID = 'observable'

const SIZE = {
  SMALL: 'small',
  LARGE: 'large',
}

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
  transition: color 0.2s ease;
  &:hover {
    color: #060606;
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
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
`

const SmallerWorksCarousel = styled.div`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: ${SMALL_THUMBNAIL_HEIGHT +
  2 * (SMALL_THUMBNAIL_HEIGHT + DEFAULT_MARGIN) +
  SCROLL_BAR_HEIGHT}px;
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

const SmallerWorkImage = styled.img`
  margin-left: -5px;
  margin-top: ${(props) => (props.workType === OBSERVABLE_ID ? '-8px' : '0')};
  height: ${(props) => (props.workType === OBSERVABLE_ID ? '120px' : '100px')};
`

const Thumbnail = styled.div`
  background-color: #060606;
  border-radius: 4px;
  height: ${(props) =>
    props.size === SIZE.LARGE ? '200px' : `${SMALL_THUMBNAIL_HEIGHT}px`};
  overflow: hidden;
  width: ${(props) => (props.size === SIZE.LARGE ? '367px' : '184px')};
`

const ThumbnailImage = styled.img`
  width: ${(props) => (props.size === SIZE.LARGE ? '367px' : '184px')};
`

const WorkDetails = styled.div`
  padding: ${DEFAULT_MARGIN}px;
`

const WorkTitle = styled(OutboundLink)`
  color: #060606;
  display: block;
  margin-bottom: ${DEFAULT_MARGIN}px;
`

const WorkTitleLink = styled(Link)`
  color: #060606;
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
  color: ${(props) => (props.selected ? '#060606' : '#A3A3A3')};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin-right: ${DEFAULT_MARGIN}px;
  min-width: ${DEFAULT_MARGIN}px;
  transition: color 0.2s ease;
  &:hover {
    color: #060606;
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
      selectedSmallerWorkType: 'all',
      selectedWrittenWorkTag: 'all',
    }
  }

  _filterSmallerWork(workType) {
    this.setState({selectedSmallerWorkType: workType})
  }

  _filterWrittenWork(tag) {
    this.setState({selectedWrittenWorkTag: tag})
  }

  render() {
    const {selectedSmallerWorkType, selectedWrittenWorkTag} = this.state
    const {data, pageContext} = this.props
    const {edges: posts} = data.allMarkdownRemark
    const {smallerWorks} = pageContext
    return (
      <Layout>
        <WorksSection>
          <h2>Larger Works</h2>
          <LargerWorksCarousel>
            {LARGER_WORKS.sort((a, b) => b.createdAt - a.createdAt).map(
              (work) => (
                <LargerWorks key={work.url}>
                  <Thumbnail size={SIZE.LARGE}>
                    <OutboundLink
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ThumbnailImage
                        alt={work.title}
                        size={SIZE.LARGE}
                        src={withPrefix(work.thumbnail)}
                      />
                    </OutboundLink>
                  </Thumbnail>
                  <WorkDetails>
                    <BlogMetadata>{formatData(work.createdAt)}</BlogMetadata>
                    <WorkTitle
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
          <Tabs>
            {[
              {id: 'all', text: 'All Sources'},
              {id: OBSERVABLE_ID, text: 'Observable'},
              {id: BLOCKS_ID, text: 'Bl.ocks'},
            ].map((tab) => (
              <Tab
                key={tab.id}
                selected={tab.id === selectedSmallerWorkType}
                onClick={() => this._filterSmallerWork(tab.id)}
              >
                {tab.text}
              </Tab>
            ))}
          </Tabs>
          <SmallerWorksCarousel>
            {smallerWorks
              .filter(
                (smallerWork) =>
                  selectedSmallerWorkType === 'all' ||
                  smallerWork.workType === selectedSmallerWorkType
              )
              .map((smallerWork, i) => (
                <SmallerWorks key={i}>
                  <Thumbnail size={SIZE.SMALL}>
                    <OutboundLink
                      href={smallerWork.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SmallerWorkImage
                        alt={smallerWork.alt}
                        src={smallerWork.imgUrl}
                        workType={smallerWork.workType}
                      />
                    </OutboundLink>
                  </Thumbnail>
                </SmallerWorks>
              ))}
          </SmallerWorksCarousel>
        </WorksSection>

        <WorksSection>
          <h2>Written Works</h2>
          <Tabs>
            {/*
              TODO: Make this generative so that adding a new tag updates this list automatically
            */}
            {[
              {id: 'all', text: 'All Tags'},
              {id: 'API', text: 'API'},
              {id: 'D3.js', text: 'D3.js'},
              {id: 'JavaScript', text: 'JavaScript'},
              {id: 'jQuery', text: 'jQuery'},
              {id: 'MongoDB', text: 'MongoDB'},
              {id: 'UX / UI', text: 'UX / UI'},
            ].map((tab) => (
              <Tab
                key={tab.id}
                selected={tab.id === selectedWrittenWorkTag}
                onClick={() => this._filterWrittenWork(tab.id)}
              >
                {tab.text}
              </Tab>
            ))}
          </Tabs>
          <div className="blog-posts">
            {posts
              .filter((post) => post.node.frontmatter.title.length > 0)
              .filter(
                (post) =>
                  selectedWrittenWorkTag === 'all' ||
                  post.node.frontmatter.tags.includes(selectedWrittenWorkTag)
              )
              .map(({node: post}) => {
                return (
                  <BlogPreview key={post.id}>
                    <BlogMetadata>
                      {formatData(post.frontmatter.date)}
                      <MiddleDot>/</MiddleDot>
                      {post.frontmatter.tags.map((tag) => (
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
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: {frontmatter: {published: {ne: false}}}
      sort: {order: DESC, fields: [frontmatter___date]}
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
