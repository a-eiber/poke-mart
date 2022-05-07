const {
  db,
  models: { User, Product, OrderProducts, Order },
} = require('../server/db');
const products = require('./productSeed');
const users = require('./userSeed');
const carts = require('./cartSeed');
const orders = require('./orderSeed');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(async (user) => {
        return User.create(user);
      }),
    );

    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      }),
    );

    await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      }),
    );

    await Promise.all(
      carts.map((cart) => {
        return OrderProducts.create(cart);
      }),
    );
    console.log(`Seeded ${users.length} users`);
    console.log(`Seeded ${products.length} products`);
    console.log(`Seeded ${carts.length} carts`);
    console.log(`Seeded ${orders.length} orders`);
    console.log(`Seeded successfully`);
  } catch (err) {
    console.log(err);
  }
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('Commence Seeding Operations');
  try {
    await db.authenticate();
    console.log('Connection has been established successfully');
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('Closing database connection');
    await db.close();
    console.log('Database connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
*/
if (module === require.main) {
  runSeed();
}
