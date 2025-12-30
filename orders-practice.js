const fs = require("fs");
const { get } = require("http");
const path = require("path");

const file = path.join(__dirname, "data", "order.json");

function readData() {
  try {
    if (!fs.existsSync(file)) {
      console.error("file is not exists", file);
      return null;
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data;
  } catch (error) {
    return null;
  }
};

function writeData(){
    try{
folder=path.dirname(file);
if(!fs.existsSync(folder)){
fs.mkdirSync(folder,{recursive:true});
}
fs.writeFileSync(file,JSON.stringify(data,null,4));
return "the data is savad";
    }

    catch(error){
return null;
    }
};


function createOrder(customerName){

const orders=readData()||[];
let newId=1;
if (orders.length>0){
const maxId=Math.max(...orders.map((order)=>order.id));
 newId=maxId+1;
}

const newOrder={
id:newId,
customerName:customerName,
orderItems:[]
};

orders.push(newOrder);
writeData(orders);
return newOrder;
};


function addItemToOrder(orderId, item, qty) {
    if (qty <= 0) {
        throw new Error(' qty should be greater than 0');
    }

    if (!item || !item.id) {
        throw new Error("Invalid item");
    }

    const orders = readData() || [];
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex === -1) {
        return false;
    }

    if (!orders[orderIndex].orderItems) {
        orders[orderIndex].orderItems = [];
    }

    const orderItem = {
        itemId: item.id,
        name: item.name,
        price: item.price,
        qty: qty,
        lineTotal: item.price * qty
    };

    orders[orderIndex].orderItems.push(orderItem);
    saveData(orders);
    return true;
}


function getOrderById(orderId) {
    const orders = readData();
    return orders.find(order => order.id === orderId);
}


function printInvoice(order) {
    if (!order) {
        console.log('Order not found.');
        return;
    }
    
    console.log('\n========== INVOICE ==========');
    console.log(`Order ID: ${order.id}`);
    console.log(`Customer Name: ${order.customerName}`);
    console.log('------------------------------');
    console.log('Purchased Items:');
    console.log('------------------------------');
    
    if (order.orderItems.length === 0) {
        console.log('There are no items in this order.');
    } else {
        order.orderItems.forEach(item => {
            console.log(`${item.name} | ${item.price} KD x ${item.qty} = ${item.lineTotal} KD`);
        });
    }
    
    console.log('------------------------------');
    const total = getOrderTotal(order);
    console.log(`Total Amount: ${total} KD`);
    console.log('==============================\n');
}

module.exports = {
    createOrder,
    addItemToOrder,
    getOrderById,
    getOrderTotal,
    printInvoice
};


