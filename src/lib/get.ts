import "whatwg-fetch";

const ENDPOINT =
  "https://atlas.auspic.es/graph/3aea62b3-5a5a-45aa-a425-7ec87452d86e";

const QUERY = `
  query($criteria: JSON!) {
    consecutives: object {
      ... on Collection {
        contents(metadata: $criteria) {
          metadata
          entity {
            ... on Text {
              name
              body
            }
          }
        }
      }
    }
  }
`;

export type Response = {
  metadata: Partial<{
    id: string;
    break: string;
    color: string;
    title: string;
    width: string;
    separator: string;
    text_align: string;
    background_color: string;
  }>;
  entity: {
    name: string;
    body: string;
  };
};

export const get = async (id: string): Promise<Response> => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      query: QUERY,
      variables: { criteria: { id } },
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const {
    data: {
      consecutives: { contents },
    },
  } = await res.json();

  const [content] = contents;

  return content;
};
