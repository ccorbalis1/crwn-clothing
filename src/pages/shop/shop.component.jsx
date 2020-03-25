import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    /* When this component mounts, download the collection data base from firestore
    and update the redux state with the object: Collections */


    componentDidMount() {
        const { updateCollections } = this.props; 
        // updateCollections is a redux action that replaces collection object with the snapshot
        // downloaded and re-arranged.
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            //Snapshot is an array of objects which is converted and embellished by the
            // convertCollectionSnapshotToMap routine.
            updateCollections(collectionsMap);
            this.setState({ loading: false});
        });

    }
    
    render() {
        const { match } = this.props;
        const { loading } = this.state;
    
        return (
            <div>
                <Route exact path={`${match.path}`} 
                    render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> }/>
                <Route path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> }/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))

});


    
export default connect(null, mapDispatchToProps)(ShopPage) ;