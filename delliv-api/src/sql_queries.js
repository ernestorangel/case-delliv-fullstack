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

function getAllOpenOrders(idStore) {
  let query = `
    SELECT
    *
    FROM delliv_db.order
    WHERE idStore = ${idStore}
  `;
  return query;
}

function createOrder({ uuid, idStore, itemsArray }) {
  let values = [];

  for (const item of itemsArray) {
    values.push(
      `(\'${uuid}\',\'${item.id}\', \'${idStore}\', \'${item.quantity}\' )`
    );
  }

  let query = `
    INSERT INTO delliv_db.order
    (
      uuid,
      idItem,
      idStore,
      quantity
    ) 
    VALUES
    ${values.join(',')}
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
  getAllOpenOrders,
  createOrder,
};
