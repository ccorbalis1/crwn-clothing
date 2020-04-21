import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStartSaga } from './shop/shop.sagas';

function* rootSaga() {
    yield all([call(fetchCollectionsStartSaga)]); 
}

export default rootSaga;