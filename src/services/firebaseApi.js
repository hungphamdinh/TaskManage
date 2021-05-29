import {db} from '../configuration/firebase';
export const getItemEachType = async (limit, typeName) => {
  var res = [];
  const rootDB = db
    .ref('/items')
    .limitToFirst(limit)
    .orderByChild('type')
    .equalTo(typeName);
  var snapshot = await rootDB.once('value');
  if (snapshot.exists) {
    snapshot.forEach(childSnapShot => {
      var val = childSnapShot.val();
      res.push(val);
    });
  } else {
    res = [];
  }
  return res;
};

export const getItemAllType = async limit => {
  var res = [];
  const rootDB = db.ref('/items').limitToFirst(limit);
  var snapshot = await rootDB.once('value');
  if (snapshot.exists) {
    snapshot.forEach(childSnapShot => {
      var val = childSnapShot.val();
      res.push(val);
    });
  } else {
    res = [];
  }
  return res;
};

export const getItemToSearchByTypes = async typeName => {
  var res = [];
  const rootDB = db
    .ref('/items')
    .orderByChild('type')
    .equalTo(typeName);
  var snapshot = await rootDB.once('value');
  if (snapshot.exists) {
    snapshot.forEach(childSnapShot => {
      var val = childSnapShot.val();
      res.push(val);
    });
  } else {
    res = [];
  }
  return res;
};

export const getItemToSearch = async () => {
  var res = [];
  const rootDB = db.ref('/items');
  var snapshot = await rootDB.once('value');
  if (snapshot.exists) {
    snapshot.forEach(childSnapShot => {
      var val = childSnapShot.val();
      res.push(val);
    });
  } else {
    res = [];
  }
  return res;
};