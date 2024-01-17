export default function formatMoney(number) {
  let arrAux = String(parseInt(number) / 100).split('.');
  if (arrAux[1].length == 1) arrAux[1] += '0';
  return `R$ ${arrAux.join(',')}`;
}
