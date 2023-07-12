const express = require('express');
const Web3 = require('web3');

const app = express();
const web3 = new Web3('<your-provider-url>'); // Replace with your blockchain provider URL

// Set up routes
app.get('/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  const contractAddress = '<your-contract-address>'; // Replace with your deployed contract address
  const contractABI = [
    // Replace with your contract ABI
  ];

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  try {
    const result = await contract.methods.getProduct(productId).call();
    const product = {
      name: result[0],
      countryOfOrigin: result[1]
    };
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product information' });
  }
});

app.post('/products', async (req, res) => {
  const { productId, name, countryOfOrigin } = req.body;
  const contractAddress = '<your-contract-address>'; // Replace with your deployed contract address
  const contractABI = [
    // Replace with your contract ABI
  ];

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.registerProduct(productId, name, countryOfOrigin).send({ from: accounts[0] });
    res.json({ message: 'Product registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register product' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('API server running on port 3000');
});
