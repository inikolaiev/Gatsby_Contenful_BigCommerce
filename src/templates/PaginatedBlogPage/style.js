import styled from "styled-components";

export const Content = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

export const Post = styled.div`
    margin: 20px 0;
    a {
        font-weight: bold;
        font-size: 20px;
    }
`;

export const Pagination = styled.div`
    text-align: center;
  	display: flex;
  	justify-content: center;
    div {
        padding: 10px;
	  	margin: 0 5px;
	  	border: 1px solid gray;
      	cursor: pointer;
    }
`;

export const ImageWrapper = styled.div`
	max-width: 300px;
  	object-fit: cover;
  	padding: 20px 0;
`;

export const Tag = styled.span`
  padding: 2px 5px;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  margin-left: 15px;
  
  button {
	background-color: unset;
	border: none;
    font-weight: 600;
  }
`;

export const Filter = styled.span`
  display: flex;
  align-items: center;
`;
