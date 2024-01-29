export function formatMoney(number) {
  let arrAux = String((parseInt(number) / 100).toFixed(2)).split('.');
  if (arrAux[1].length == 1) arrAux[1] += '0';
  return `R$ ${arrAux.join(',')}`;
}

export function camelCaseToRegular(camelCaseString) {
  return camelCaseString
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
}
