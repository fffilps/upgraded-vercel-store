import { shopifyFetch } from 'lib/shopify';
import { getBlogPostsQuery } from 'lib/shopify/queries/blog';
import Image from 'next/image';



interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: Props) {
  let id = params.slug;
  console.log(await params)
  
  const { body } = await shopifyFetch({
    query: getBlogPostsQuery,
    variables: {
      id: "gid://shopify/Article/997489017198"
    }
  });

  // const article = data.blog.articles.edges[0].node;
  console.log(body)

  return (
    <article className="max-w-2xl mx-auto py-8">
      {article.image && (
        <div className="aspect-video relative overflow-hidden mb-8 rounded-lg">
          <Image
            src={article.image.url}
            alt={article.image.altText || article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center gap-4 text-gray-500 mb-8">
        <span>{article.author.name}</span>
        <time dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString()}
        </time>
      </div>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}