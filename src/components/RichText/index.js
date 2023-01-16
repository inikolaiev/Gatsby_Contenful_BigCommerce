import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { Hero, Banner } from "./../../components";
import { GatsbyImage } from "gatsby-plugin-image";
import { Wrapper, ImageWrapper } from "./style";

export const RichText = ({ raw, references = [] }) => {
  const referencesMap = {};
  references.forEach((reference) => {
    referencesMap[reference.contentful_id] = reference;
  });

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const data = referencesMap[node.data.target.sys.id];
        return (
          <ImageWrapper>
            <GatsbyImage alt={data.title} image={data.gatsbyImageData} />
          </ImageWrapper>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const data = referencesMap[node.data.target.sys.id];
        console.log(data?.__typename);
        switch (data?.__typename) {
          case "ContentfulHomeHero":
            return (
              <Hero
                heading={data.title}
                subHeading={data.description}
                backgroundImage={data.photo.gatsbyImageData}
              />
            );
          case "ContentfulHomeBanner":
            return (
              <Banner
                heading={data.title}
                subHeading={data.description}
                backgroundImage={data.image.gatsbyImageData}
              />
            );
          default:
            return null;
        }
      },
    },
  };

  return (
    <Wrapper>{documentToReactComponents(JSON.parse(raw), options)}</Wrapper>
  );
};
