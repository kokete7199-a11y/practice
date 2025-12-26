const { error } = require("console");
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "data", "iteams.json");

function readData() {
  try {
    if (!fs.existsSync(file)) {
      console.error("file is not exists", file);
      return null;
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data;
  } catch (error) {
    console.error("Error reading iteams file:", error);
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
    console.error("Error writing iteams file:", error);
    return null;
  }
}

function getAllItems() {
  return readData();
}

function addItem(name, price, CategoryId) {

if (typeof price !=="number"  || price<=0){
  throw new error("price must be number and bigger than 0");
    
};

  let items = readData() || [];
  let newId = 1;
  if (items.length > 0) {
    let maxId = Math.max(...items.map((item) => item.id));
    newId = maxId + 1;
  }
  const newItems = {
    id: newId,
    name: name,
    price: price,
    CategoryId: CategoryId,
  };
  items.push(newItems);
  writeData(items);
  return newItems;
}


function listItems(){
    const items = getAllItems() || [];
    if (items.length === 0) {
      console.log("there is no items");
      return [];
    };
    console.log("Items:");
    items.forEach((item) => {
      console.log(`${item.id} - ${item.name} - ${item.price} - ${item.CategoryId}`);
    });
};




function listItemsByCategory(categoryId){
    const items=getAllItems()||[];
   const filterItem=items.filter((item)=>item.CategoryId===categoryId);

   if (filterItem.length === 0) {
    console.log("No items in this category");
    return [] ;
}
filterItem.forEach(item=>
    console.log(`${item.id} - ${item.name} - ${item.price} - ${item.CategoryId}`));
    return filterItem;
}

module.exports={
    getAllItems,
    addItem,
    listItems,
    listItemsByCategory
};


