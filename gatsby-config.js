module.exports = {
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components',
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
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53344458-1',
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: false,
        // Setting this parameter is also optional
        respectDNT: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jon Sadka Website and Blog',
        short_name: 'Jon Sadka',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#333333',
        display: 'fullscreen'
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    'gatsby-plugin-offline'
  ],
  siteMetadata: {
    siteUrl: 'https://jonsadka.com',
    title: 'Jon Sadka\'s work',
    author: 'Jon Sadka'
  }
};
