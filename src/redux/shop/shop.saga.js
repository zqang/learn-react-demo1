import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';

export function* fetchCollectionAsync(){
    yield console.log('I am fired');

    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }catch(error) {
        yield put(fetchCollectionsFailure(error.message));
    }
    

        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionsSuccess(collectionsMap));
        // }).catch(error=> dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionAsync);
}


export function* shopSaga() {
    yield all([
        call(fetchCollectionStart)
    ])
}