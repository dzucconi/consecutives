import "whatwg-fetch";

const ENDPOINT =
  "https://atlas.auspic.es/graph/3aea62b3-5a5a-45aa-a425-7ec87452d86e";

const QUERY = `
  query($criteria: JSON!) {
    consecutives: object {
      ... on Collection {
        id
        name
        contents(metadata: $criteria) {
          id
          metadata
          entity {
            kind: __typename
            ... on Text {
              id
              name
              body
            }
          }
        }
      }
    }
  }
`;

export const get = async (id: string) => {
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

  // TODO: return typed metadata as well
  return content.entity.body;
};
