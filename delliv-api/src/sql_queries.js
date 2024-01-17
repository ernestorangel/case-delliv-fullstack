function getAllDeliveryPeople(params) {
  let query = `
    SELECT
    *
    FROM delliv_db.delivery_person
  `;
  return query;
}

function getDeliveryPerson(params) {
  let query = `
    SELECT
    *
    FROM delliv_db.delivery_person
    WHERE id = ${params.id}
  `;
  return query;
}

function createDeliveryPerson(params) {
  let query = `
    INSERT 
    INTO delliv_db.delivery_person 
    (
      name, 
      login, 
      password
    ) 
    VALUES 
    (
      \'${params.name}\', 
      \'${params.login}\', 
      \'${params.encryptedPassword}\'
    );
  `;
  return query;
}
function getStore(params) {
  let query = `
    SELECT
    *
    FROM delliv_db.store
    WHERE id = ${params.id}
  `;
  return query;
}

function createStore(params) {
  let query = `
    INSERT 
    INTO delliv_db.store 
    (
      name, 
      username, 
      password
    ) 
    VALUES 
    (
      \'${params.name}\', 
      \'${params.username}\', 
      \'${params.encryptedPassword}\'
    );
  `;
  return query;
}

function getAllItems(params) {
  let query = `
    SELECT
    *
    FROM delliv_db.item
  `;
  return query;
}

function createItem(params) {
  let query = `
    INSERT 
    INTO delliv_db.item 
    (
      sku, 
      name, 
      price,
      description,
      idStore
    ) 
    VALUES 
    (
      \'${params.sku}\', 
      \'${params.name}\', 
      \'${params.price}\',
      \'${params.description}\',
      \'${params.idStore}\'
    );
  `;
  return query;
}

module.exports = {
  getAllDeliveryPeople,
  getDeliveryPerson,
  createDeliveryPerson,
  getStore,
  createStore,
  getAllItems,
  createItem,
};
