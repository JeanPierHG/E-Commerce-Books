function sortAsc(x, y) {
  if (x.title < y.title) {
    return -1;
  }
  if (x.title > y.title) {
    return 1;
  }
  return 0;
}

function sortDesc(x, y) {
  if (x.title > y.title) {
    return -1;
  }
  if (x.title < y.title) {
    return 1;
  }
  return 0;
}

module.exports = {
  sortAsc,
  sortDesc,
};
