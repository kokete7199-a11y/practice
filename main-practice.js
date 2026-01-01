const readline = require("readline");
const categories = require("./categories-practice");
const items = require("./iteams-practice");
const orders = require("./orders-practice");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\n========== Restaurant System ==========");
  console.log("1. Add Category");
  console.log("2. List Categories");
  console.log("3. Add Item");
  console.log("4. List Items");
  console.log("5. List Items by Category");
  console.log("6. Create New Order");
  console.log("7. Add Item to Order");
  console.log("8. Print Invoice");
  console.log("9. Exit");
  console.log("=======================================\n");
}

function handleChoice(choice) {
  switch (choice) {
    case "1":
      rl.question("Enter category name: ", (name) => {
        const newCategory = categories.addCategory(name);
        console.log(`Category "${newCategory.name}" added successfully.`);
          showMenuAndPrompt();
      });
      break;

    case "2":
      categories.listCategories();
      showMenuAndPrompt();
      break;

    case "3":
      rl.question("Enter item name: ", (name) => {
        rl.question("Enter item price: ", (priceInput) => {
          const price = parseFloat(priceInput);
          if (isNaN(price) || price <= 0) {
            console.error("Price must be a number greater than 0!");
            showMenuAndPrompt();
            return;
          }

          rl.question("Enter category ID: ", (categoryIdInput) => {
            const categoryId = parseInt(categoryIdInput);

            try {
              const newItem = items.addItem(name, price, categoryId);
              console.log(`Item "${newItem.name}" added successfully!`);
              showMenuAndPrompt();
            } catch (error) {
              console.error("An error occurred:", error.message);
              showMenuAndPrompt();
            }
          });
        });
      });
      break;

    case "4":
      items.listItems();
      showMenuAndPrompt();
      break;
    case "5":
      rl.question("Enter category ID: ", (categoryIdInput) => {
        const categoryId = parseInt(categoryIdInput);
        items.listItemsByCategory(categoryId);
        showMenuAndPrompt();
      });
      break;

    case "6":
      rl.question("Enter customer name: ", (customerName) => {
        const newOrder = orders.createOrder(customerName);
        console.log(
          `A new order has been created with ID ${newOrder.id} for customer ${newOrder.customerName}`
        );
        showMenuAndPrompt();
      });
      break;

    case "7":
      rl.question("Enter order ID: ", (orderIdInput) => {
        const orderId = parseInt(orderIdInput);
        const order = orders.getOrderById(orderId);

        if (!order) {
          console.error("Order not found!");
          showMenuAndPrompt();
          return;
        }

        rl.question("Enter item ID: ", (itemIdInput) => {
          const allItems = items.getAllItems();
          const itemId = parseInt(itemIdInput);
          const item = allItems.find((i) => i.id === itemId);

          if (!item) {
            console.error("Item not found!");
            showMenuAndPrompt();
            return;
          }

          rl.question("Enter quantity: ", (qtyInput) => {
            const qty = parseInt(qtyInput);

            if (isNaN(qty) || qty <= 0) {
              console.error("Quantity must be a number greater than 0!");
              showMenuAndPrompt();
              return;
            }

            try {
              const success = orders.addItemToOrder(orderId, item, qty);
              if (success) {
                console.log("Item added to order successfully!");
              } else {
                console.error("Failed to add item to order!");
              }
              showMenuAndPrompt();
            } catch (error) {
              console.error("An error occurred:", error.message);
              showMenuAndPrompt();
            }
          });
        });
      });
      break;
    case "8":
      rl.question("Enter order ID: ", (orderIdInput) => {
        const orderId = parseInt(orderIdInput);
        const order = orders.getOrderById(orderId);
        orders.printInvoice(order);
        showMenuAndPrompt();
      });
      break;

    case "9":
      console.log("Thank you for using the Restaurant System. Goodbye!");
      rl.close();
      break;

    default:
      console.log("Invalid option. Please choose a number from 1 to 9.");
      showMenuAndPrompt();
      break;
  }
}

function showMenuAndPrompt() {
  showMenu();
  rl.question("Enter your choice: ", handleChoice);
}
console.log("welcome in resturant mangement system");
showMenuAndPrompt();
