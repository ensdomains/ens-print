import { ethers } from 'ethers';
import { gql, request } from 'graphql-request';

const provider = new ethers.providers.StaticJsonRpcProvider(
  process.env.WEB3_PROVIDER
);

const GET_DOMAIN_BY_NAME = gql`
  query getDomains($name: String) {
    domains(where: { name: $name }) {
      isMigrated
      createdAt
      resolver {
        texts
        coinTypes
        contentHash
        addr {
          id
        }
      }
    }
  }
`;

export async function retrieveProfile(ensName) {
  const [graphPromise, resolverPromise] = await Promise.allSettled([
    request(process.env.GRAPH_URI, GET_DOMAIN_BY_NAME, { name: ensName }),
    provider.getResolver(ensName),
  ]);
  if (graphPromise.status === 'rejected' || !graphPromise.value.domains[0]) {
    alert(graphPromise.reason || 'No profile found');
    return;
  }
  if (resolverPromise.status === 'rejected') {
    alert(graphPromise.reason);
    return;
  }

  const graphData = graphPromise.value;
  const resolver = resolverPromise.value;

  const texts = graphData.domains[0].resolver.texts;
  const textValuePromises = await Promise.allSettled(
    texts.map((key) => resolver.getText(key))
  );
  const kv = {};
  texts.forEach((text, i) => {
    const dataPromise = textValuePromises[i];
    if (dataPromise.status === 'fulfilled') {
      kv[text] = dataPromise.value;
    }
  });

  return { name: resolver.name, address: resolver.address, records: kv };
}
