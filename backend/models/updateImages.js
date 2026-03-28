const pool = require('../config/database');

const productImages = [
  // Electronics
  { id: 1, name: 'iPhone 14 Pro', image: '/products/iphone-14-pro.jpg' },
  { id: 2, name: 'Samsung Galaxy S23', image: '/products/samsung-galaxy-s23.jpg' },
  { id: 3, name: 'Sony Headphones', image: '/products/sony-headphones.jpg' },
  { id: 4, name: 'iPad Air', image: '/products/ipad-air.jpg' },
  { id: 5, name: 'Apple Watch', image: '/products/apple-watch.jpg' },
  { id: 17, name: 'MacBook Pro 14', image: '/products/macbook-pro-14.jpg' },
  { id: 18, name: 'AirPods Pro', image: '/products/airpods-pro.jpg' },
  { id: 19, name: 'GoPro Hero 11', image: '/products/gopro-hero-11.jpg' },
  { id: 20, name: 'Samsung 65" TV', image: '/products/samsung-65-tv.jpg' },
  { id: 21, name: 'USB-C Cable', image: '/products/usb-c-cable.jpg' },

  // Fashion
  { id: 6, name: 'T-Shirt', image: '/products/t-shirt.jpg' },
  { id: 7, name: 'Jeans', image: '/products/jeans.jpg' },
  { id: 8, name: 'Shoes', image: '/products/shoes.jpg' },
  { id: 22, name: 'Casual Blazer', image: '/products/casual-blazer.jpg' },
  { id: 23, name: 'Winter Jacket', image: '/products/winter-jacket.jpg' },
  { id: 24, name: 'Polo T-Shirt', image: '/products/polo-t-shirt.jpg' },
  { id: 25, name: 'Formal Trousers', image: '/products/formal-trousers.jpg' },
  { id: 26, name: 'Leather Belt', image: '/products/leather-belt.jpg' },

  // Home
  { id: 9, name: 'Coffee Maker', image: '/products/coffee-maker.jpg' },
  { id: 10, name: 'Cookware Set', image: '/products/cookware-set.jpg' },
  { id: 27, name: 'Microwave Oven', image: '/products/microwave-oven.jpg' },
  { id: 28, name: 'Mixer Grinder', image: '/products/mixer-grinder.jpg' },
  { id: 29, name: 'Bedsheet Set', image: '/products/bedsheet-set.jpg' },
  { id: 30, name: 'Dining Table Set', image: '/products/dining-table-set.jpg' },
  { id: 31, name: 'Kitchen Knife Set', image: '/products/kitchen-knife-set.jpg' },

  // Sports
  { id: 11, name: 'Yoga Mat', image: '/products/yoga-mat.jpg' },
  { id: 12, name: 'Football', image: '/products/football.jpg' },
  { id: 32, name: 'Dumbbells Set', image: '/products/dumbbells-set.jpg' },
  { id: 33, name: 'Badminton Racket', image: '/products/badminton-racket.jpg' },
  { id: 34, name: 'Cricket Bat', image: '/products/cricket-bat.jpg' },
  { id: 35, name: 'Running Shoes', image: '/products/running-shoes.jpg' },
  { id: 36, name: 'Gym Bag', image: '/products/gym-bag.jpg' },

  // Books
  { id: 13, name: 'Atomic Habits', image: '/products/atomic-habits.jpg' },
  { id: 14, name: 'Dune', image: '/products/dune.jpg' },
  { id: 37, name: 'Think Like A Monk', image: '/products/think-like-a-monk.jpg' },
  { id: 38, name: 'The Midnight Library', image: '/products/the-midnight-library.jpg' },
  { id: 39, name: 'Educated', image: '/products/educated.jpg' },
  { id: 40, name: 'Rich Dad Poor Dad', image: '/products/rich-dad-poor-dad.jpg' },
  { id: 41, name: 'Sapiens', image: '/products/sapiens.jpg' },

  // Toys
  { id: 15, name: 'Toy Car', image: '/products/toy-car.jpg' },
  { id: 16, name: 'Chess', image: '/products/chess.jpg' },
  { id: 42, name: 'LEGO Star Wars', image: '/products/lego-star-wars.jpg' },
  { id: 43, name: 'Drone Camera', image: '/products/drone-camera.jpg' },
  { id: 44, name: 'Action Figures', image: '/products/action-figures.jpg' },
  { id: 45, name: 'Board Game Set', image: '/products/board-game-set.jpg' },
  { id: 46, name: 'Puzzle 1000pc', image: '/products/puzzle-1000pc.jpg' },
];

async function updateProductImages() {
  let connection;
  try {
    connection = await pool.getConnection();

    console.log('🖼️  Updating product images with real product photos...\n');

    for (const product of productImages) {
      const imageJson = JSON.stringify([product.image]);

      await connection.execute(
        'UPDATE products SET images = ? WHERE id = ?',
        [imageJson, product.id]
      );

      console.log(`✅ ${product.name}`);
    }

    console.log('\n🎉 All product images updated successfully!');
    console.log('💡 Images are now from reliable sources (Apple, Samsung, Pexels, Amazon)\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
}

updateProductImages();
