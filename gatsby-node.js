/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const _ = require('lodash')
const {JSDOM} = require('jsdom')

const BLOCKS_ID = 'blocks'
const OBSERVABLE_ID = 'observable'

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const tagTemplate = path.resolve('src/templates/tags.js')

  return graphql(`
    {
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              path
              tags
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({node}) => {
      const {path} = node.frontmatter
      createPage({
        component: blogPostTemplate,
        context: {pagePath: path},
        path,
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, (edge) => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      createPage({
        component: tagTemplate,
        context: {tag},
        path: `/tags/${_.kebabCase(tag)}/`,
      })
    })
  })
}

exports.onCreatePage = ({actions, page}) => {
  if (page.path === '/') {
    return new Promise((resolve) => {
      Promise.all([observablesPromise(), gistsPromise()]).then(
        ([observablesPayload, gistsPayload]) => {
          const {observablesList, observablesErr} = observablesPayload
          const {gistsList, gistsErr} = gistsPayload
          // Replace new page with old page
          const {createPage, deletePage} = actions
          const oldPage = {...page}
          deletePage(oldPage)
          createPage({
            ...page,
            context: {
              gistsList,
              observablesErr,
              smallerWorks: observablesList
                // .filter(observable => observable.)
                .concat(gistsList)
                .sort(
                  (a, b) =>
                    Number(new Date(b.updatedAt)) -
                    Number(new Date(a.updatedAt))
                ),
            },
          })
          resolve()
        }
      )
    })
  }
}

function observablesPromise() {
  const observableRequestOptions = {
    method: 'GET',
    headers: {
      'User-Agent': 'jon-sadka-personal-website',
    },
  }

  return new Promise((observableResolve) => {
    fetch(
      'https://api.observablehq.com/documents/@jonsadka.rss',
      observableRequestOptions
    )
      .then((res) => res.text())
      .then((observableWebpage) => {
        observablesListFromObservableSiteRSS(
          observableWebpage,
          (err, observablesList) => {
            observableResolve({
              observablesList,
              observablesErr: err,
            })
          }
        )
      })
      .catch((err) => {
        observableResolve({
          observablesList: [],
          observablesErr: err,
        })
      })
  })
}

function gistsPromise() {
  const gistsRequestOptions = {
    method: 'GET',
    headers: {
      'User-Agent': 'my-blog',
    },
  }

  return new Promise((gistsResolve) => {
    fetch(
      'https://api.github.com/users/jonsadka/gists?per_page=100',
      gistsRequestOptions
    )
      .then((res) => res.json())
      .then((rawGistsList) => {
        const gistsList = gistsListFromPayload(rawGistsList)
        gistsResolve({
          gistsList,
          gistsErr: null,
        })
      })
      .catch((err) => {
        gistsResolve({
          gistsList: [],
          gistsErr: err,
        })
      })
  })
}

function gistsListFromPayload(gistsListPayload) {
  return gistsListPayload
    .filter(
      (gist) =>
        gist.files['thumbnail.png'] && gist.files['thumbnail.png'].raw_url
    )
    .map((gist) => ({
      alt: gist.description,
      createdAt: gist.created_at,
      href: `https://bl.ocks.org/jonsadka/${gist.id}`,
      imgUrl: gist.files['thumbnail.png'].raw_url,
      updatedAt: gist.updated_at,
      workType: BLOCKS_ID,
    }))
}

function observablesListFromObservableSiteRSS(siteRSS, callback) {
  const payloadData = payloadDataFromRSS(siteRSS, (err, payloadData) => {
    const rawNotebooks = payloadData.rss.channel[0].item
    const preloadData = {notebooks: rawNotebooks}

    callback(
      null,
      preloadData.notebooks
        .filter(
          (notebook) =>
            !['Inputs', 'Comparisons of various bar chart properties'].includes(
              notebook.title[0]
            )
        )
        .map((notebook) => ({
          alt: notebook.title[0],
          createdAt: null,
          href: notebook.guid[0],
          imgUrl: getImageUrl(notebook.description[0]),
          updatedAt: notebook.pubdate[0],
          workType: OBSERVABLE_ID,
        }))
    )
  })
}

function payloadDataFromRSS(siteRSS, callback) {
  const dom = new JSDOM(siteRSS, {contentType: 'text/xml'})
  const items = Array.from(dom.window.document.querySelectorAll('item'))

  const notebooks = items.map((item) => ({
    title: [item.querySelector('title').textContent],
    guid: [item.querySelector('guid').textContent],
    description: [item.querySelector('description').textContent],
    pubdate: [item.querySelector('pubDate').textContent],
  }))

  const payloadData = {
    rss: {
      channel: [
        {
          item: notebooks,
        },
      ],
    },
  }

  callback(null, payloadData)
}

function getImageUrl(htmlString) {
  const dom = new JSDOM(htmlString)
  return dom.window.document.querySelector('img').getAttribute('src')
}
