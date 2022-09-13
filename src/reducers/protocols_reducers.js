import { GET_ALL_PROTOCOLS } from '../actions';

const protocols_reducer = (state, action) => {
  if (action.type === GET_ALL_PROTOCOLS) {
    return {
      ...state,
      protocols: action.payload,
    };
  }

  // if (action.type === SEARCH_PRODUCT) {
  //   const { products } = state;

  //   let temp = [];
  //   temp = products.filter(
  //     (item) =>
  //       item.productName.toLowerCase().includes(action.payload.toLowerCase()) ||
  //       item._id === action.payload
  //   );

  //   return {
  //     ...state,
  //     filter: action.payload,
  //     filtered_products: temp,
  //   };
  // }

  // if (action.type === CLEAR_FILTER) {
  //   return {
  //     ...state,
  //     filter: '',
  //     search: '',
  //   };
  // }

  // if (action.type === ADD_TO_BAG) {
  //   let temp = [...state.bag];
  //   const newProduct = temp.findIndex((item) => item === action.payload);

  //   if (newProduct === -1) {
  //     temp.push(action.payload);
  //   }
  //   return {
  //     ...state,
  //     bag: temp,
  //   };
  // }

  // if (action.type === REMOVE_FROM_BAG) {
  //   let temp = [];
  //   temp = state.bag.filter((item) => item !== action.payload);

  //   return {
  //     ...state,
  //     bag: temp,
  //   };
  // }

  // if (action.type === CLEAN_BAG) {
  //   return {
  //     ...state,
  //     bag: [],
  //   };
  // }

  // if (action.type === SET_PRODUCTS) {
  //   return {
  //     ...state,
  //     products: [...action.payload],
  //   };
  // }
  // if (action.type === SET_USER_PRODUCTS) {
  //   return {
  //     ...state,
  //     userProducts: action.payload,
  //   };
  // }
  // if (action.type === MARK_PRODUCTS) {
  //   const { bag, userProducts, products } = state;

  //   //console.log(bag, userProducts, products);

  //   let temp = [];
  //   temp = products.map((product) => {
  //     bag.map((item) => {
  //       if (product.id === item.id) {
  //         product.mark = 'bag';
  //       }
  //     });
  //     userProducts.map((item) => {
  //       if (product.id === item.id) {
  //         product.mark = 'sold';
  //       }
  //     });

  //     return product;
  //   });

  //   return {
  //     ...state,
  //     products: temp,
  //   };
  // }

  throw new Error(`No matching ${action.type} - action type`);
};

export default protocols_reducer;
