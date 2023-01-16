import styled from "styled-components";

export const MenuWrapper = styled.div`
  margin: auto 0 100px auto;
  display: flex;
`;

export const MenuItem = styled.div`
  margin: auto 0;
  padding: 0 16px;
  line-height: 60px;
  a {
    color: black;
    &:hover {
      color: #999;
    }
  }
`;

export const SubMenuItemWrapper = styled.div`
  position: relative;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    > div:last-child {
      background-color: white;
      display: block;
    }
  }
  > div:last-child {
    display: none;
    position: absolute;
    top: 50px;
    white-space: nowrap;
    box-shadow: 2px 2px 2px black;
    padding: 8px;
    border: 1px solid #999;
    > div {
      line-height: 1;
      padding: 8px 16px;
    }
  }
`;
