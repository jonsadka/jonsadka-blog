module.exports = {
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: []
      }
    },
  ],
  siteMetadata: {
    title: 'Jon Sadka\'s work',
    author: 'Jon Sadka'
  }
};
