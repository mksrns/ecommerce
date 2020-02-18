module.exports = function Cart(oldCart) {
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;

    this.add = function(item, id) {
        var storeItem = this.item[id];
        if(!storedItem) {
            storeItem = this.item[id] = { item: item, qty: 0, price: 0 };
        }
        storeItem.qty++;
        storeItem.price = storeItem.item.price * storeItem.qty;
        this.totalQty++;
        this.totalPrice += storeItem.price;
    };
    this.generateArray = function() {
        var arr = [];
        for(var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
}