import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { MenuWrapper, MenuItem, SubMenuItemWrapper } from "./style";

export function Menu() {
  const result = useStaticQuery(graphql`
    query menuQuery {
      contentfulMainMenu {
        menuItems {
          label
          page {
            ... on ContentfulBlogListingPage {
              slug
            }
            ... on ContentfulCategoryPage {
              slug
            }
            ... on ContentfulCmsPage {
              slug
            }
          }
          subMenuItems {
            label
            page {
              ... on ContentfulBlogListingPage {
                slug
              }
              ... on ContentfulCategoryPage {
                slug
              }
              ... on ContentfulCmsPage {
                slug
              }
            }
          }
        }
      }
      allBigCommerceCategories(filter: { is_visible: { eq: true } }) {
        edges {
          node {
            custom_url {
              url
            }
            name
          }
        }
      }
    }
  `);

  const categoryLinks = () => {
    if (!result.allBigCommerceCategories.edges) return;
    return (
      <MenuItem>
        <SubMenuItemWrapper>
          <div>BigCommerce Categories</div>
          <div>
            {result.allBigCommerceCategories.edges.map((link, index) => {
              return (
                <div key={index}>
                  <Link to={link.node.custom_url.url}>{link.node.name}</Link>
                </div>
              );
            })}
          </div>
        </SubMenuItemWrapper>
      </MenuItem>
    );
  };

  return (
    <MenuWrapper>
      <MenuItem>
        <Link to="/">Home</Link>
      </MenuItem>
      {result.contentfulMainMenu.menuItems.map((menuItem) => (
        <MenuItem key={menuItem.id}>
          {!menuItem.subMenuItems ? (
            <Link to={`/${menuItem.page.slug}`}>{menuItem.label}</Link>
          ) : (
            <SubMenuItemWrapper>
              <div>{menuItem.label}</div>
              <div>
                {menuItem.subMenuItems?.map((subMenuItem) => (
                  <div key={subMenuItem.id}>
                    <Link to={`/${subMenuItem.page.slug}`}>
                      {subMenuItem.label}
                    </Link>
                  </div>
                ))}
              </div>
            </SubMenuItemWrapper>
          )}
        </MenuItem>
      ))}
      {categoryLinks()}
    </MenuWrapper>
  );
}
