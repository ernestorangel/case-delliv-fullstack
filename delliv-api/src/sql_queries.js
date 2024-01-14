function getDeliveryPerson(params) {
  let query = `
    SELECT
    *
    FROM delliv_db.delivery_person
    WHERE id = ${params.id}
  `;
  return query;
}

module.exports = {
  getDeliveryPerson,
};
