import React from "react";
import Header from "@/app/components/Header";
import { client } from "@/sanity/lib/client";
import { VT323 } from "next/font/google";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Post } from "@/app/utils/interface";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";

const dateFont = VT323({ weight: "400", subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const query = ` 
*[_type == "post" && slug.current == "${slug}"] {
  title,
  slug,
  publishedAt,
  excerpt,
  _id,
  body,
  tags[]-> {
    _id,
    slug,
    name
  }
}`;

  const post = await client.fetch(query);
  return post?.[0]; // Asegúrate de obtener el primer post si la respuesta es un array
}

export const revalidate = 60;

const page = async ({ params }: Params) => {
  console.log(params, "params");
  const post: Post = await getPost(params?.slug);

  if (!post) {
    notFound(); // Muestra un mensaje si el post no se encuentra
  }

  return (
    <div>
      <Header title={post?.title} />
      <div className="text-center">
        <span className={`${dateFont?.className} text-purple-500`}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tags/${tag.slug.current}`}>
              <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                #{tag?.name}
              </span>
            </Link>
          ))}
        </div>
        <div className={richTextStyles}>
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};
export default page;

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlFor(value).url()} alt="post" width={700} height={700} />
    ),
  },
};

const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-6
prose-heading:text-2xl
prose-p:mb-7
prose-p:leading-8
prose-li:list-disc
prose-li:leading-8
prose-li:ml-4
`;
