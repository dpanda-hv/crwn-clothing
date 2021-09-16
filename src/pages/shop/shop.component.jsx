import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.utils';

import {
  updateCollections,
  loadCollectionsStart,
  loadCollectionsSuccess,
} from '../../redux/shop/shop.actions';

import { selectCollectionLoading } from '../../redux/shop/shop.selector';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

class Shop extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections, loadCollectionsStart, loadCollectionsSuccess } =
      this.props;

    loadCollectionsStart();

    const collectionRef = collection(firestore, 'collections');

    // this.unsubscribeFromSnapshot = onSnapshot(
    //   collectionRef,
    //   async (snapshot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     updateCollections(collectionsMap);
    //     loadCollectionsSuccess();
    //   }
    // );

    getDocs(collectionRef).then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      loadCollectionsSuccess();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
  }

  render() {
    const { match, isLoading } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(otherProps) => (
            <CollectionsOverviewWithSpinner
              isLoading={isLoading}
              {...otherProps}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(otherProps) => (
            <CollectionWithSpinner isLoading={isLoading} {...otherProps} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
  loadCollectionsStart: () => dispatch(loadCollectionsStart()),
  loadCollectionsSuccess: () => dispatch(loadCollectionsSuccess()),
});

const mapStateToProps = createStructuredSelector({
  isLoading: selectCollectionLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
