export const setGlobalState = (store) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    store.setState({ userData: userData })
};
export const setImageUpload = (store, value) => {
    store.setState({ imageUpload: value });
}
export const setExpand = (store, value) => {
    store.setState({ expand: value });
}
