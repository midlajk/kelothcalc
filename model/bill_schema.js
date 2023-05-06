import Realm from 'realm';
import {Bill_schema} from './schema'

const databaseOptions = {
    schema: [Bill_schema]
  };
  


  export const addbill = (data) =>
  new Promise((resolve, reject) => {
    console.log(data)
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {

            realm.create('Bill_schema', data);
            resolve(); 
        
        
        });
      })
      .catch(error =>
        {
          console.log("hy"+error);

        });
  });

  export const Viewarabica = (sdate,edate) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {

          var startdate = new Date(sdate);
          startdate.setHours(0,0,0,0);
          
          var enddate = new Date(edate)
          enddate.setHours(23,59,59,999);
          let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Arabica"', startdate, enddate)
          Totalweight = checkcourse.sum('Weight')
        weight = checkcourse.filtered('rate >= 10').sum('beens')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,weight:weight,ep:ep,total:total,Totalweight:Totalweight});
        });
      })
      .catch((error) => {
          console.log(error)})

});
export const SearchArabica = (sdate,edate,name) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        var startdate = new Date(sdate);
        startdate.setHours(0,0,0,0);
        var enddate = new Date(edate)
        enddate.setHours(23,59,59,999);
        let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Arabica" && name CONTAINS[c] $2', startdate, enddate,name)
        Totalweight = checkcourse.sum('Weight')
        weight = checkcourse.filtered('rate >= 10').sum('beens')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,weight:weight,ep:ep,total:total,Totalweight:Totalweight});
      });
    })
    .catch((error) => {
        console.log(error)})

});
export const ViewArabicastorage = (sdate,edate) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        var startdate = new Date(sdate);
        startdate.setHours(0,0,0,0);
        
        var enddate = new Date(edate)
        enddate.setHours(23,59,59,999);
        let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Arabica" && rate<=10 ', startdate, enddate)
        Totalweight = checkcourse.sum('Weight')
        bags = checkcourse.sum('bags')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,bags:bags,ep:ep,total:total,Totalweight:Totalweight});
      });
    })
    .catch((error) => {
        console.log(error)})

});

export const SearchArabicastorage = (sdate,edate,name) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        var startdate = new Date(sdate);
        startdate.setHours(0,0,0,0);
        
        var enddate = new Date(edate)
        enddate.setHours(23,59,59,999);
        let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Arabica" && rate<=10 && name CONTAINS[c] $2 ', startdate, enddate,name)
        Totalweight = checkcourse.sum('Weight')
        bags = checkcourse.sum('bags')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,bags:bags,ep:ep,total:total,Totalweight:Totalweight});
      });
    })
    .catch((error) => {
        console.log(error)})

});

 
export const ViewRc = (sdate,edate) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        var startdate = new Date(sdate);
        startdate.setHours(0,0,0,0);
        
        var enddate = new Date(edate)
        enddate.setHours(23,59,59,999);
        let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Rc Cherry"  ', startdate, enddate)
        Totalweight = checkcourse.sum('Weight')
        weight = checkcourse.filtered('rate >= 10').sum('beens')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,weight:weight,ep:ep,total:total,Totalweight:Totalweight});
      });
    })
    .catch((error) => {
        console.log(error)})

});

export const SearchRc = (sdate,edate,name) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        var startdate = new Date(sdate);
        startdate.setHours(0,0,0,0);
        var enddate = new Date(edate)
        enddate.setHours(23,59,59,999);
        let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Rc Cherry" && name CONTAINS[c] $2', startdate, enddate,name)
        Totalweight = checkcourse.sum('Weight')
        weight = checkcourse.filtered('rate >= 10').sum('beens')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,weight:weight,ep:ep,total:total,Totalweight:Totalweight});
      });
    })
    .catch((error) => {
        console.log(error)})

});

export const ViewRcstorage = (sdate,edate) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        var startdate = new Date(sdate);
        startdate.setHours(0,0,0,0);
        
        var enddate = new Date(edate)
        enddate.setHours(23,59,59,999);
        let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Rc Cherry" && rate<=10 ', startdate, enddate)
        Totalweight = checkcourse.sum('Weight')
        bags = checkcourse.sum('bags')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,bags:bags,ep:ep,total:total,Totalweight:Totalweight});
      });
    })
    .catch((error) => {
        console.log(error)})

});

export const SearchRcstorage = (sdate,edate,name) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        var startdate = new Date(sdate);
        startdate.setHours(0,0,0,0);
        
        var enddate = new Date(edate)
        enddate.setHours(23,59,59,999);
        let checkcourse = realm.objects('Bill_schema').filtered('c_date >= $0 && c_date <= $1 && product="Rc Cherry" && rate<=10 && name CONTAINS[c] $2 ', startdate, enddate,name)
        Totalweight = checkcourse.sum('Weight')
        bags = checkcourse.sum('bags')
        ep = checkcourse.sum('beens')
        total = checkcourse.sum('total')

        resolve({data:checkcourse,bags:bags,ep:ep,total:total,Totalweight:Totalweight});
      });
    })
    .catch((error) => {
        console.log(error)})

});


export const Viewdata = (id) =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {

        
        let checkcourse = realm.objects('Bill_schema').filtered('id == $0', id)
        resolve(checkcourse);
      });
    })
    .catch((error) => {
        console.log(error)})

});
export const finddata = id =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {
        let findata = realm.objectForPrimaryKey(
          'Bill_schema',
          id,
        );
        resolve(findata);
      });
    })
    .catch(error => reject(error));
});

export const edit = data =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {
       let edit = realm.objectForPrimaryKey(
        'Bill_schema',
       data.id,
       );
      edit.name = data.name;
      edit.product = data.product;
          edit.outern = data.outern;
          edit.moisture = data.moisture;
          edit.finalot = data.finalot;
          edit.bags = data.bags;
          edit.Weight = data.Weight;
          edit.rate = data.rate;
          edit.total = data.total;
          edit.beens = data.beens;
        resolve();
      });
    })
    .catch(error => reject(error));
});
export const deletedata = id =>
new Promise((resolve, reject) => {
  Realm.open(databaseOptions)
    .then(realm => {
      realm.write(() => {
        let findata = realm.objectForPrimaryKey(
          'Bill_schema',
          id,
        );
        realm.delete(findata);

        resolve();
      });
    })
    .catch(error => reject(error));
});
