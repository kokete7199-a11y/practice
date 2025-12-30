const readline = require('readline');
const categories = require('./categories');
const items = require('./items');
const orders = require('./orders');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n========== Restaurant System ==========');
    console.log('1. Add Category');
    console.log('2. List Categories');
    console.log('3. Add Item');
    console.log('4. List Items');
    console.log('5. List Items by Category');
    console.log('6. Create New Order');
    console.log('7. Add Item to Order');
    console.log('8. Print Invoice');
    console.log('9. Exit');
    console.log('=======================================\n');
}




