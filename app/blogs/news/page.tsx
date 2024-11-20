import { shopifyFetch } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export const experimental_ppr = true

interface Article {
  id: string;
  title: string;
  handle: string;
  publishedAt: string;
  excerpt?: string;
  content: string;
  image?: {
    url: string;
    altText?: string;
  };
  authorV2: {
    name: string;
  };
}

interface ShopifyResponse {
  body: {
    data: {
      articles: {
        nodes: Article[];
      };
    };
  };
}

export default async function BlogPosts() {
  
  const { body } = await shopifyFetch({
    query: `
    {
	articles (first: 10) {
	 nodes {
	   title
    content
    id
    handle
    publishedAt
    excerpt
    image {
      url
      altText
    }
    authorV2{
      name
    }
	 } 
  }
}
    `,
    // variables: {
    //   first: 10
    // }
  }) as ShopifyResponse;

  const articles: Article[] = body.data.articles.nodes;

  return (
    <div className="w-full py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={{
              pathname: `/blogs/news/${article.handle}`,
              query: {
                title: article.title,
                content: article.content,
                publishedAt: article.publishedAt,
                authorName: article.authorV2.name ? article.authorV2.name : "Unknown Author",
                imageUrl: article.image?.url,
                imageAlt: article.image?.altText,
              }
            }}
            className="group"
          >
            <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {article.image && (
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={article.image.url}
                    alt={article.image.altText || article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                {article.excerpt && (
                  <p className="text-gray-600 mb-2">{article.excerpt}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.authorV2.name}</span>
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}