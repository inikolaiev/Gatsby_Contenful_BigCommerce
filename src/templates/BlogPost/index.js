import React from "react";
import { graphql } from "gatsby";
import { Layout } from "components";
import { GatsbyImage } from "gatsby-plugin-image";
import { ImageWrapper } from "../PaginatedBlogPage/style";

const BlogPost = (props) => {
    const {contentfulBlogPost} = props.data
    return (
        <Layout>
            <h1>
                {contentfulBlogPost.title}
            </h1>
            <ImageWrapper>
                <GatsbyImage alt={"banner"} image={contentfulBlogPost.image.gatsbyImageData}/>
            </ImageWrapper>
            <p>
                {contentfulBlogPost.description}
            </p>
            <p>
                {contentfulBlogPost.publishedDate}
            </p>
        </Layout>
    );
};

export const query = graphql`
    query BlogPostQuery($postId: String) {
        contentfulBlogPost(contentful_id: { eq: $postId }) {
            publishedDate(formatString: "DD MMM YYYY")
            description
            title
            contentful_id
            slug
            image {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
        }
    }
`;

export default BlogPost;
