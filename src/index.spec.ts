import { jest } from "@jest/globals";

jest.unstable_mockModule('webdav', () => ({
  createClient: jest.fn(),
}));

const { getDirectoryContentsWrapper } = await import("./index.js");

const {createClient} = await import('webdav');

describe('getDirectoryContentsWrapper', () => {
  it('should return the contents of a directory', async () => {
    // Arrange
    const mockWebDavClient = {
      getDirectoryContents: jest.fn<any>().mockResolvedValue([
        {
          filename: 'foo.txt',
          basename: 'foo',
          lastmod: '2021-01-01T00:00:00.000Z',
          size: 123,
          type: "file",
          etag: '1234567890abcdef'
        }
      ] as any)
    };

    jest.mocked(createClient).mockReturnValue(mockWebDavClient as any)
    // const mockGetDirectoryContents = jest.fn<any>();
    // mockWebDavClient = {
    //   getDirectoryContents: mockGetDirectoryContents
    // };

    // console.log(webdav!.createClient);
    // console.log(jest.fn());
    // jest.mocked(webdav!.createClient).mockReturnValue(mockWebDavClient);
    // mockGetDirectoryContents.mockResolvedValue([
    //   {
    //     filename: 'foo.txt',
    //     basename: 'foo',
    //     lastmod: '2021-01-01T00:00:00.000Z',
    //     size: 123,
    //     type: "file",
    //     etag: '1234567890abcdef'
    //   }
    // ] as any);

    // Act
    const contents = await getDirectoryContentsWrapper('/');

    // Assert
    expect(mockWebDavClient.getDirectoryContents).toHaveBeenCalledWith('/');
    expect(contents).toEqual([{
      filename: 'foo.txt',
      basename: 'foo',
      lastmod: '2021-01-01T00:00:00.000Z',
      size: 123,
      type: "file",
      etag: '1234567890abcdef'
    }]);
  });
});