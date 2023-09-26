import {createClient} from 'webdav';

export async function getDirectoryContentsWrapper(path: string) {
  const client = createClient("https://example.org");

  console.log(`In prod code: client=`, client);

  const contents = await client.getDirectoryContents(path);
  return contents;
}
