const formatList = data => {
  let categories = [];
  let keys = Object.keys(data.message);
  let values = Object.values(data.message);

  for (let i = 0; i < keys.length; i++) {
    if (values[i]?.length) {
      let children = values[i].map(v => `${keys[i]}-${v}`);
      categories = categories.concat(children);
    } else {
      categories.push(keys[i]);
    }
  }
  return categories;
};

export default formatList;
