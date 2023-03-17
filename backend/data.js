import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Akash',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('password', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Akash',
        logo: '',
        description: 'Best Seller in the world',
        rating: 4.7,
        numReviews: 1046
      }
    },
    {
      name: 'John',
      email: 'john@gmail.com',
      password: bcrypt.hashSync('password', 8),
      isAdmin: false,
      isSeller: true,
      seller: {
        name: 'John',
        logo: '',
        description: 'Best Seller in the universe',
        rating: 3.7,
        numReviews: 125
      }
    },
    {
      name: 'Jack',
      email: 'jack@gmail.com',
      password: bcrypt.hashSync('password', 8),
      isAdmin: false,
      isSeller: false
    }
  ],
  products: [
    {
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      seller: '6414c187817f04ec068288e2',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product'
    },
    {
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      seller: '6414c187817f04ec068288e2',
      price: 100,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product'
    },
    {
      name: 'Lacoste Free Shirt',
      category: 'Shirts',
      image: '/images/p3.jpg',
      seller: '6414c187817f04ec068288e2',
      price: 220,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality product'
    },
    {
      name: 'Nike Slim Pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      seller: '6414c187817f04ec068288e2',
      price: 78,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product'
    },
    {
      name: 'Puma Slim Pant',
      category: 'Pants',
      image: '/images/p5.jpg',
      seller: '6414c187817f04ec068288e2',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product'
    },
    {
      name: 'Adidas Fit Pant',
      category: 'Pants',
      image: '/images/p6.jpg',
      seller: '6414c187817f04ec068288e2',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product'
    }
  ]
};

export default data;
