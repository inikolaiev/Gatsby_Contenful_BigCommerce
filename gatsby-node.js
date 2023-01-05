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
		data: { contentfulBlogListingPage, allContentfulBlogPost, allContentfulCategoryPage, allBigCommerceProducts },
	} = await graphql(`
        {
            contentfulBlogListingPage {
                postPerPage
                slug
            }
            allContentfulBlogPost(
                sort: { fields: publishedDate, order: DESC }
            ) {
                edges {
                    node {
                        slug
                        publishedDate(formatString: "DD MMM YYYY")
                        description
                        title
                        blogTag
                        contentful_id
                        image {
                            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                        }
                    }
                }
            }
            
             allContentfulCategoryPage {
                edges {
                  	node {
						products
						id
						title
						slug
                  	}
             	}
  			}
  			
  			allBigCommerceProducts {
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
					}
				}
  			}
        }
    `);

	allContentfulCategoryPage.edges.forEach(category=> {
		createPage({
			path: `${category.node.slug}`,
			context: {
				products: category.node.products,
				title: category.node.title,
			},
			component: path.resolve("./src/templates/Category/index.js"),
		});

		allBigCommerceProducts.edges.forEach(product => {
			if (category.node.products.includes(product.node.sku)) {
				createPage({
					path: `${category.node.slug}/${product.node.sku}`,
					context: {
						product: product.node,
					},
					component: path.resolve("./src/templates/ProductPage/index.js"),
				});
			}
		})
	})

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
		path: `${contentfulBlogListingPage.slug}`,
		component: path.resolve(
			"./src/templates/PaginatedBlogPage/index.js"
		),
		context: {
			postsPerPage: contentfulBlogListingPage.postPerPage,
			posts: allContentfulBlogPost.edges.map(blogPost => blogPost.node)
		},
	});

};
