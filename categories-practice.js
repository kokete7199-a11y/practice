const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "data", "categories.json");

function readData() {
  try {
    if (!fs.existsSync(file)) {
      console.error("file is not exists", file);
      return null;
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data;
  } catch (error) {
    console.error("Error reading categories file:", error);
    return null;
  }
}

function writeData(data) {
  try {
    const folder = path.dirname(file);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 4));
    return "the data is savad";
  } catch (error) {
    console.error("Error writing categories file:", error);
    return null;
  }
}

function getAllCategories() {
  return readData();
}

function addCategory(name) {
  const categories = readData() || [];
  let newId = 1;

  if (categories.length > 0) {
    const maxId = Math.max(...categories.map((cat) => cat.id));
    newId = maxId + 1;
  }
  const category = {
    id: newId,
    name: name,
  };
  categories.push(category);
  writeData(categories);
  return category;
}

function listCategories() {
  const categories = getAllCategories() || [];
  if (categories.length === 0) {
    console.log("there is no categories");
    return [];
  }
  //////////categaries//////////
  categories.forEach((category) => {
    console.log(`${category.id} - ${category.name}`);
  });
}

function findCategoryById(id) {
  const categories = getAllCategories() || [];
  const findcategory = categories.find((category) => category.id === id);
  if (!findcategory) {
    console.log("there is no category with this id");
  }
  return findcategory;
}



module.exports={
    getAllCategories,
    addCategory,
    listCategories,
    findCategoryById

};