import "server-only";
import ImageKit from "@imagekit/nodejs";

// Server-only — uploads go through our own API route/Server Action using the
// private key, so it's never exposed to the browser. Admin file picker sends
// the raw file to the server, which calls imagekit.files.upload() here.
export const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
