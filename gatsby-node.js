const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const {
    data: {
      contentfulBlogListingPage,
      allContentfulBlogPost,
      allBigCommerceCategories,
      allBigCommerceProducts,
    },
  } = await graphql(`
    {
      contentfulBlogListingPage {
        postPerPage
        slug
      }
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            slug
            publishedDate(formatString: "DD MMM YYYY")
            description
            title
            tags
            contentful_id
            image {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }

      allBigCommerceCategories(filter: { is_visible: { eq: true } }) {
        edges {
          node {
            bigcommerce_id
            custom_url {
              url
            }
            name
          }
        }
      }

      allBigCommerceProducts(filter: { is_visible: { eq: true } }) {
        edges {
          node {
            images {
              url_standard
            }
            name
            variants {
              option_values {
                label
                option_display_name
              }
              sku
            }
            sku
            description
            price
            categories
            sale_price
          }
        }
      }
    }
  `);

  allBigCommerceCategories.edges.forEach((category) => {
    createPage({
      path: `${category.node.custom_url.url}`,
      context: {
        categoryId: +category.node.bigcommerce_id,
        title: category.node.name,
      },
      component: path.resolve("./src/templates/Category/index.js"),
    });

    allBigCommerceProducts.edges.forEach((product) => {
      if (
        product.node.categories.includes(parseInt(category.node.bigcommerce_id))
      ) {
        createPage({
          path: `${category.node.custom_url.url}${product.node.sku}`,
          context: {
            product: product.node,
          },
          component: path.resolve("./src/templates/ProductPage/index.js"),
        });
      }
    });
  });

  allContentfulBlogPost.edges.forEach((blogPost) => {
    createPage({
      path: `${contentfulBlogListingPage.slug}/${blogPost.node.slug}`,
      context: {
        postId: blogPost.node.contentful_id,
      },
      component: path.resolve("./src/templates/BlogPost/index.js"),
    });
  });

  createPage({
    path: contentfulBlogListingPage.slug,
    component: path.resolve("./src/templates/PaginatedBlogPage/index.js"),
    context: {
      blogSlug: contentfulBlogListingPage.slug,
      postsPerPage: contentfulBlogListingPage.postPerPage,
      posts: allContentfulBlogPost.edges.map((blogPost) => blogPost.node),
    },
  });
};
