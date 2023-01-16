import React from "react";
import { graphql } from "gatsby";
import { Layout, RichText } from "../components";

const Index = (props) => {
  const { contentfulHomePage: contentfulData } = props.data;

  return (
    <Layout>
      <h1>{contentfulData.title}</h1>
      <RichText
        references={contentfulData.heroBanner.references}
        raw={contentfulData.heroBanner.raw}
      />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query homePageQuery {
    contentfulHomePage {
      title
      heroBanner {
        raw
        references {
          ... on ContentfulHomeHero {
            __typename
            contentful_id
            title
            description
            photo {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          ... on ContentfulHomeBanner {
            __typename
            contentful_id
            title
            description
            image {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
