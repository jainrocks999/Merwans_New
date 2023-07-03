export default (state = '', action) => {
  switch (action.type) {
    case 'add_coupon':
      return (state = action.payload);
    case 'remove_coupon':
      return (state = '');
    default:
      return state;
  }
};
