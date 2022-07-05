import { ethers } from 'ethers'
import { gql, request } from 'graphql-request'

const provider = new ethers.providers.StaticJsonRpcProvider(
  process.env.WEB3_PROVIDER
);

const GET_DOMAIN_BY_NAME = gql`
  query getDomains($name: String, $label: String) {
    domains(where: { name: $name }) {
      createdAt
      owner {
        registrations(where: { labelName: $label }) {
          registrationDate
        }
      }
    }
  }
`;

export async function retrieveProfile(ensName) {
  const labels = ensName.split('.');

  const [graphPromise, resolverPromise] = await Promise.allSettled([
    request(process.env.GRAPH_URI, GET_DOMAIN_BY_NAME, { name: ensName, label: labels[0] }),
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

  if (!resolver) return;

  const isDotETH = labels.length === 2 && labels[1] === 'eth';
  const registrationDate = graphData.domains[0].owner.registrations[0]?.registrationDate;
  const date = (isDotETH && registrationDate) ? {
    label: "REGISTERED",
    value: new Date(parseInt(registrationDate) * 1000),
  } : {
    label: "CREATED",
    value: new Date(parseInt(graphData.domains[0].createdAt) * 1000),
  }

  return { name: resolver.name, date, };
}
