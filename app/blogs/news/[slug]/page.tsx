import Image from 'next/image';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    title: string;
    content: string;
    publishedAt: string;
    authorName: string;
    imageUrl?: string;
    imageAlt?: string;
  }>;
}) {
  const {
    title,
    content,
    publishedAt,
    authorName,
    imageUrl,
    imageAlt
  } = await searchParams;

  return (
    <article className="max-w-2xl mx-auto py-8 border rounded-lg w-5/6 p-8">
      {imageUrl && (
        <div className="aspect-video relative overflow-hidden mb-8 rounded-lg">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center gap-4 text-gray-500 mb-8">
        <span>{authorName}</span>
        <time dateTime={publishedAt}>
          {new Date(publishedAt).toLocaleDateString()}
        </time>
      </div>
      <div 
        className="prose max-w-none dark:text-white text-black"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}