import React, { useEffect, useState } from "react";
import { Layout } from "components";
import { Link } from "gatsby";
import { Content, Post, Pagination, ImageWrapper, Tag, Filter } from "./style";
import { GatsbyImage } from "gatsby-plugin-image";

const PaginatedBlogPage = ({ pageContext }) => {
  const [posts, setPosts] = useState([...pageContext.posts]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postToRender, setPostToRender] = useState(posts);
  const [filterTags, setFilterTags] = useState([]);

  useEffect(() => {
    setPostToRender(
      posts.slice(
        currentPage * pageContext.postsPerPage,
        currentPage * pageContext.postsPerPage + pageContext.postsPerPage
      )
    );
  }, [currentPage, posts]);

  useEffect(() => {
    filterTags.length
      ? setPosts(
          pageContext.posts.filter((blog) =>
            blog.tags.some((tag) => filterTags.includes(tag))
          )
        )
      : setPosts(pageContext.posts);
  }, [filterTags]);

  const blogTags = [
    ...new Set(pageContext.posts.map((post) => post.tags).flat(1)),
  ];
  const handleTag = (tag) => {
    setFilterTags((prevState) =>
      prevState.includes(tag)
        ? prevState.filter((item) => item !== tag)
        : [...prevState, tag]
    );

    setCurrentPage(0);
  };

  const numPages = Math.ceil(posts.length / pageContext.postsPerPage);

  return (
    <Layout>
      <Filter>
        <h3>Filter by tag: </h3>
        {blogTags &&
          blogTags.map((tag, index) => (
            <Tag key={index}>
              <button
                style={{ color: filterTags.includes(tag) ? "red" : "black" }}
                onClick={() => {
                  handleTag(tag);
                }}
              >
                {tag}
              </button>
            </Tag>
          ))}
      </Filter>
      <Content>
        {postToRender.map((post) => (
          <Post key={post.contentful_id}>
            <div>
              <Link to={`/${pageContext.blogSlug}/${post.slug}`}>
                {post.title}
              </Link>
              {post.tags.map((tag) => (
                <Tag>{tag}</Tag>
              ))}
            </div>

            <ImageWrapper>
              <GatsbyImage alt={"banner"} image={post.image.gatsbyImageData} />
            </ImageWrapper>
            <div>{post.description}</div>

            <div>
              <small>{post.publishedDate}</small>
            </div>
          </Post>
        ))}
      </Content>
      <Pagination>
        {Array.from({ length: numPages }).map((n, i) => {
          return (
            <div
              style={{ backgroundColor: currentPage === i ? "gray" : "white" }}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </div>
          );
        })}
      </Pagination>
    </Layout>
  );
};

export default PaginatedBlogPage;
