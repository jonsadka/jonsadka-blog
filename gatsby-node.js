/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

const request = require('request');

const BLOCKS_ID = 'blocks'
const OBSERVABLE_ID = 'observable'

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const tagTemplate = path.resolve('src/templates/tags.js')

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
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
  }`)
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const posts = result.data.allMarkdownRemark.edges;

      posts.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {} // additional data can be passed via context
        });
      });

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      _.each(posts, edge => {
        if (_.get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag,
          },
        });
      });
    });
}

exports.onCreatePage = ({boundActionCreators, page}) => {
  if (page.path === '/') {
    return new Promise(resolve => {
      Promise.all([
        observablesPromise(), gistsPromise()
      ]).then(([observablesPayload, gistsPayload]) => {
        const {observablesList, observablesErr} = observablesPayload
        const {gistsList, gistsErr} = gistsPayload
        // Replace new page with old page
        const { createPage, deletePage } = boundActionCreators;
        const oldPage = { ...page };
        deletePage(oldPage);
        createPage({
          ...page,
          context: {
            gistsList,
            observablesErr,
            smallerWorks: observablesList.concat(gistsList)
              .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
          }
        });
        resolve();
      })
    })
  }
}

function observablesPromise() {
  const observableRequestOptions = {
    url: 'https://beta.observablehq.com/@jonsadka',
    headers: {
      'User-Agent': 'jon-sadka-personal-website'
    }
  }

  return new Promise(observableResolve => {
    request(observableRequestOptions, (err, res, observableWebpage) => {
      const observablesList = observablesListFromObservableSiteHTML(observableWebpage);
      observableResolve({
        observablesList,
        observablesErr: err
      });
    });
  })
}

function gistsPromise() {
  const gistsRequestOptions = {
    url: 'https://api.github.com/users/jonsadka/gists?per_page=100',
    headers: {
      'User-Agent': 'my-blog'
    },
    json: true
  }

  return new Promise(gistsResolve => {
    request(gistsRequestOptions, (err, res, rawGistsList) => {
      const gistsList = gistsListFromPayload(rawGistsList);
      gistsResolve({
        gistsList,
        gistsErr: err
      });
    });
  })
}

function gistsListFromPayload(gistsListPayload) {
  return gistsListPayload
    .filter(gist =>
      gist.files['thumbnail.png'] && gist.files['thumbnail.png'].raw_url
    )
    .map(gist => ({
      alt: gist.description,
      createdAt: gist.created_at,
      href: `https://bl.ocks.org/jonsadka/${gist.id}`,
      imgUrl: gist.files['thumbnail.png'].raw_url,
      updatedAt: gist.updated_at,
      workType: BLOCKS_ID
    }))
}

function observablesListFromObservableSiteHTML(siteHTML) {
  const payloadData = payloadDataFromHTML(siteHTML)
  const preloadData = JSON.parse(unescape(payloadData)) || {notebooks: []}
  return preloadData.notebooks
    .filter(notebook => notebook.slug && notebook.thumbnail)
    .map(notebook => ({
      alt: notebook.title,
      createdAt: null,
      href: `https://beta.observablehq.com/@jonsadka/${notebook.slug}`,
      imgUrl: `https://static.observableusercontent.com/thumbnail/${notebook.thumbnail}.jpg`,
      updatedAt: notebook.update_time,
      workType: OBSERVABLE_ID
    }))
}

function payloadDataFromHTML(siteHTML) {
  const payloadPrefix = 'preloadData='
  const payloadStartIndex = siteHTML.search(payloadPrefix)
  const partialPayload = siteHTML.slice(payloadStartIndex + payloadPrefix.length)
  const payloadEndIndex = partialPayload.search(/}<\/script>/g) + 1
  const payload = partialPayload.slice(0, payloadEndIndex)
  return payload
}
