/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

const request = require('request');

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
    const requestOptions = {
      url: 'https://api.github.com/users/jonsadka/gists?per_page=100',
      headers: {
        'User-Agent': 'my-blog'
      },
      json: true
    }
    return new Promise(resolve => {
      request(requestOptions, (err, res, gistsList) => {
        // Replace new page with old page
        const { createPage, deletePage } = boundActionCreators;
        const oldPage = {...page};
        deletePage(oldPage);
        createPage({
          ...page,
          context: {
            err,
            gistsList: gistsList.filter(gist =>
              gist.files['thumbnail.png'] && gist.files['thumbnail.png'].raw_url
            ).sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
          }
        });
        resolve();
      });
    })

  }
}
