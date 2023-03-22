const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
        {
          allContentfulBlogPost {
            edges {
              node {
                id
                slug
      }
    }
  }
}
`).then(result => {
  if (result.errors) {
    reject(result.errors)
  }
  result.data.allContentfulBlogPost.edges.forEach((edge) => {
  console.log('slug value:', edge.node.slug);
  createPage({
    path: edge.node.slug,
    component: require.resolve("./src/templates/blog-post.js"),
    context: { 
      slug: edge.node.slug
    },
    defer: true,
  })
})
resolve()
  })
  })
}
