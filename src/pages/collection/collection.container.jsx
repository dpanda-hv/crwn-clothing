import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Collection from './collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const GET_COLLECTIONS_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CollectionsContainer = () => {
  const { collectionId } = useParams();
  const { loading, data } = useQuery(GET_COLLECTIONS_BY_TITLE, {
    variables: { title: collectionId },
  });

  return WithSpinner(Collection)({
    isLoading: loading,
    collections: data?.getCollectionsByTitle,
  });
};

export default CollectionsContainer;
