import blogArticleFragment from '../fragments/blog';

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs {
    blogs {
      edges {
        node {
          title
          handle
          articles(first: 10)
      }
    }
  }
`;

export const getBlogArticlesQuery = /* GraphQL */ `
  query GetBlogArticles($first: Int!) {
    articles(first: $first) {
      edges {
        node {
          ...blogArticle
        }
      }
    }
  }
  ${blogArticleFragment}
`;

export const getBlogPostsQuery = /* GraphQL */ `
  query GetBlogPosts {
    article(id: "gid://shopify/Article/997489017198") {
    content
    id
    handle
  }
`;


