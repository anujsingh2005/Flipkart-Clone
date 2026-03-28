-- Insert categories
INSERT INTO categories (name, icon_url) VALUES
('Electronics', '📱'),
('Fashion', '👕'),
('Home & Kitchen', '🏠'),
('Sports', '⚽'),
('Books', '📚'),
('Toys', '🧸');

-- Insert products
INSERT INTO products (name, description, price, original_price, rating, category_id, stock, images, specifications) VALUES

-- Electronics
('iPhone 14 Pro', 'Premium smartphone with advanced camera', 99999, 129999, 4.7, 1, 50,
 '["/products/iphone-14-pro.jpg"]',
 '{"processor":"A16 Bionic","RAM":"6GB","storage":"256GB","display":"6.1 inch"}'),

('Samsung Galaxy S23', 'Flagship Android smartphone', 79999, 99999, 4.6, 1, 45,
 '["/products/samsung-galaxy-s23.jpg"]',
 '{"processor":"Snapdragon 8","RAM":"8GB","storage":"256GB","display":"6.1 inch"}'),

('Sony Headphones', 'Noise cancelling headphones', 29999, 39999, 4.8, 1, 60,
 '["/products/sony-headphones.jpg"]',
 '{"battery":"40 hours","weight":"250g"}'),

('iPad Air', 'Tablet device', 59999, 74999, 4.6, 1, 30,
 '["/products/ipad-air.jpg"]',
 '{"processor":"M1","RAM":"8GB"}'),

('Apple Watch', 'Smartwatch', 39999, 49999, 4.5, 1, 40,
 '["/products/apple-watch.jpg"]',
 '{"battery":"18 hours","water":"50m"}'),

-- Fashion
('T-Shirt', 'Cotton t-shirt', 499, 999, 4.3, 2, 100,
 '["/products/t-shirt.jpg"]',
 '{"material":"Cotton"}'),

('Jeans', 'Denim jeans', 1999, 3499, 4.4, 2, 80,
 '["/products/jeans.jpg"]',
 '{"material":"Denim"}'),

('Shoes', 'Running shoes', 5999, 9999, 4.6, 2, 50,
 '["/products/shoes.jpg"]',
 '{"brand":"Nike"}'),

-- Home
('Coffee Maker', 'Coffee machine', 3999, 6999, 4.4, 3, 40,
 '["/products/coffee-maker.jpg"]',
 '{"power":"1000W"}'),

('Cookware Set', 'Steel cookware', 4999, 8999, 4.5, 3, 35,
 '["/products/cookware-set.jpg"]',
 '{"pieces":"8"}'),

-- Sports
('Yoga Mat', 'Exercise mat', 799, 1499, 4.4, 4, 80,
 '["/products/yoga-mat.jpg"]',
 '{"length":"180cm"}'),

('Football', 'Soccer ball', 799, 1499, 4.3, 4, 100,
 '["/products/football.jpg"]',
 '{"size":"5"}'),

-- Books
('Atomic Habits', 'Self help book', 449, 799, 4.7, 5, 120,
 '["/products/atomic-habits.jpg"]',
 '{"author":"James Clear","pages":"320"}'),

('Dune', 'Sci-fi novel', 599, 999, 4.8, 5, 100,
 '["/products/dune.jpg"]',
 '{"author":"Frank Herbert","pages":"688"}'),

-- Toys
('Toy Car', 'RC car', 2999, 4999, 4.5, 6, 40,
 '["/products/toy-car.jpg"]',
 '{"speed":"40 km/h"}'),

('Chess', 'Chess board', 1499, 2999, 4.6, 6, 50,
 '["/products/chess.jpg"]',
 '{"material":"Wood"}');
