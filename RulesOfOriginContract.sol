pragma solidity ^0.8.0;

contract RulesOfOriginContract {
    struct Product {
        string name;
        string countryOfOrigin;
    }

    mapping(uint256 => Product) public products;

    event ProductRegistered(uint256 indexed productId, string name, string countryOfOrigin);

    function registerProduct(uint256 productId, string memory name, string memory countryOfOrigin) external {
        products[productId] = Product(name, countryOfOrigin);
        emit ProductRegistered(productId, name, countryOfOrigin);
    }

    function getProduct(uint256 productId) external view returns (string memory, string memory) {
        Product memory product = products[productId];
        return (product.name, product.countryOfOrigin);
    }
}
