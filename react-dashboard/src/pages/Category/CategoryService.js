// import axios from 'axios';

// const BASE_URL = 'https://e-commerce-gg46.onrender.com/api/category';

// // export const addCategory = (formData) => {
// //   return axios.post(`${BASE_URL}/addCategory`, formData, {
// //     headers: {
// //       "Content-Type" :'application/json'
// //     }
// //   });
// // };

// export const addCategory = async (formData) => {
//   console.log("Mocked addCategory called:", formData);
//   return Promise.resolve({ data: { message: "Mock addCategory success" } });
// };

// export const updateCategory = (id, formData) => {
//   return axios.put(`${BASE_URL}/updateCategory/${id}`, formData, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// };

// export const deleteCategory = (id) => {
//   return axios.delete(`${BASE_URL}/deleteCategory/${id}`);
// };

// export const viewCategory = (id) => {
//   return axios.get(`${BASE_URL}/viewCategory/${id}`);
// };

// export const listOfCategories = () => {
//   return axios.post(`${BASE_URL}/listOfCategories`);
// };

// export const categoryOfProducts = () => {
//   return axios.post(`${BASE_URL}/categoryOfProducts`);
// };

// export const categoryDropdown = () => {
//   return axios.get(`${BASE_URL}/categoryDropdown`);
// };


// CategoryService.js (mock version)

let mockCategories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
]; 

export const addCategory = async (formData) => {
  console.log("Mocked addCategory called:", formData);

  const newCategory = {
    id: Date.now(), // unique ID
    name: formData.name,
  };

  mockCategories.push(newCategory); // add to mock list

  return Promise.resolve({
    data: {
      status: "Success",
      message: "Mock addCategory success",
      category: newCategory,
    }
  });
};

export const listOfCategories = async () => {
  console.log("Mocked listOfCategories called");

  return Promise.resolve({
    data: {
      statusCode: 200,
      status: "Success",
      message: "Mock categories fetched",
      categories: mockCategories
    }
  });
};

// Keep real or mock versions of these depending on what works
export const updateCategory = async (id, formData) => {
  mockCategories = mockCategories.map((cat) =>
    cat.id === id ? { ...cat, name: formData.name } : cat
  );
  return Promise.resolve({
    data: {
      message: "Mock update success"
    }
  });
};

export const deleteCategory = async (id) => {
  mockCategories = mockCategories.filter((cat) => cat.id !== id);
  return Promise.resolve({
    data: {
      message: "Mock delete success"
    }
  });
};

export const viewCategory = async (id) => {
  const cat = mockCategories.find((cat) => cat.id === id);
  return Promise.resolve({
    data: cat || { name: "" }
  });
};

// You can leave these real or remove them if not needed
export const categoryOfProducts = () => Promise.resolve({ data: {} });
export const categoryDropdown = () => Promise.resolve({ data: {} });

// ProductService.js (mock version)

let mockProducts = [
  {
    id: 1,
    name: "Laptop",
    description: "Powerful gaming laptop",
    price: 1000,
    categoryId: 1
  },
  {
    id: 2,
    name: "T-Shirt",
    description: "Cotton shirt",
    price: 20,
    categoryId: 2
  }
];

// ✅ Add Product
export const addProduct = async (formData) => {
  const newProduct = {
    id: Date.now(),
    ...formData
  };
  mockProducts.push(newProduct);
  return Promise.resolve({
    data: {
      message: "Mock addProduct success",
      product: newProduct
    }
  });
};

// ✅ Update Product
export const updateProduct = async (id, formData) => {
  mockProducts = mockProducts.map((prod) =>
    prod.id === id ? { ...prod, ...formData } : prod
  );
  return Promise.resolve({
    data: { message: "Mock update success" }
  });
};

// ✅ Delete Product
export const deleteProduct = async (id) => {
  mockProducts = mockProducts.filter((prod) => prod.id !== id);
  return Promise.resolve({
    data: { message: "Mock delete success" }
  });
};

// ✅ View Product
export const viewProduct = async (id) => {
  const product = mockProducts.find((prod) => prod.id === id);
  return Promise.resolve({
    data: product || {}
  });
};

// ✅ List All Products
export const listOfProducts = async () => {
  return Promise.resolve({
    data: {
      statusCode: 200,
      status: "Success",
      message: "Mock products fetched",
      products: mockProducts
    }
  });
};

// ✅ Dropdown (optional)
export const productDropdown = async () => {
  return Promise.resolve({
    data: mockProducts.map((p) => ({ id: p.id, name: p.name }))
  });
};
