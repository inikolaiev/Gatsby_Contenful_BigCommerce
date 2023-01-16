import React from "react";
import {
  HeroWrapper,
  HeadingWrapper,
  Heading,
  SubHeading,
  ImageWrapper,
} from "./style";
import { GatsbyImage } from "gatsby-plugin-image";

export const Banner = ({ heading, subHeading, backgroundImage }) => {
  return (
    <HeroWrapper>
      <HeadingWrapper>
        <div>
          <Heading>{heading}</Heading>
          <SubHeading>{subHeading}</SubHeading>
        </div>
      </HeadingWrapper>
      <ImageWrapper>
        <GatsbyImage alt={"banner"} image={backgroundImage} />
      </ImageWrapper>
    </HeroWrapper>
  );
};
