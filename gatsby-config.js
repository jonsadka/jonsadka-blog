module.exports = {
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
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
        background_color: '#ffffff',
        display: 'fullscreen',
        icon: 'src/images/5921.png',
        name: 'Jon Sadka Website and Blog',
        short_name: 'Jon Sadka',
        start_url: '/',
        theme_color: '#060606',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
  siteMetadata: {
    siteUrl: 'https://jonsadka.com',
    title: "Jon Sadka's work",
    author: 'Jon Sadka',
  },
}
