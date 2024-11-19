const blogArticleFragment = /* GraphQL */ `
  fragment blogArticle on Article {
    id
    title
    handle
    publishedAt
    excerpt
    content
    image {
      url
      altText
      width
      height
    }
    author {
      name
    }
  }
`;

export default blogArticleFragment; 