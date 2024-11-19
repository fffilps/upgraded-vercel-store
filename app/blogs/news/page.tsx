import { shopifyFetch } from 'lib/shopify';
import { getBlogArticlesQuery } from 'lib/shopify/queries/blog';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPosts() {
  
  const { body } = await shopifyFetch({
    query: getBlogArticlesQuery,
    variables: {
      first: 10
    }
  });

  const articles = body.data.articles.edges.map(({ node }) => node);
  // console.log(articles)

  return (
    <div className="w-full py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={`/blogs/news/${article.handle}?id=${article.id}`}
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
                  <span>{article.author.name}</span>
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