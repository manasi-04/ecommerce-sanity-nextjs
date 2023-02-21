import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: '88a3qcys',
    dataset: 'production',
    apiVersion: '2023-01-21',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const imageUrl = (source: any) => builder.image(source) as any as string;