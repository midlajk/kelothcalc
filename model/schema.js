import Realm from 'realm';
export const Bill_schema = {
    name: 'Bill_schema',
    properties: {
      id: 'int',
      name: "string",
      c_date:"date",
      common:'string',
      product:"string",
      outern: 'float',
      moisture:'float',
      finalot:'float',
      bags:'int',
      Weight:'float',
      rate:'int',
      total:'int',
      beens:'float',
    },
    primaryKey: 'id'
  
  
  };