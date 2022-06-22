function sortAsc(x, y) {
  if (x.rating < y.rating) {
    return -1;
  }
  if (x.rating > y.rating) {
    return 1;
  }
  return 0;
}

function sortDesc(x, y) {
  if (x.rating > y.rating) {
    return -1;
  }
  if (x.rating < y.rating) {
    return 1;
  }
  return 0;
}

module.exports = {
  sortAsc,
  sortDesc,
};
