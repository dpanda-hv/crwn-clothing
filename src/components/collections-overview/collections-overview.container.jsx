import { gql, useQuery } from '@apollo/client';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  const { loading, data } = useQuery(GET_COLLECTIONS);
  return WithSpinner(CollectionsOverview)({
    isLoading: loading,
    collections: data?.collections.map((collection) => ({
      ...collection,
      routeName: encodeURI(collection.title.toLowerCase()),
    })),
  });
};

export default CollectionsOverviewContainer;
