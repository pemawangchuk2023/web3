import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";

const settings = {
  apiKey: 'process.env.ALCHEMY_API_KEY',
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

export const getTransactionHistory = async (address: string) => {
  const data = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    toAddress: address,
    category: [
      AssetTransfersCategory.EXTERNAL, 
      AssetTransfersCategory.INTERNAL, 
      AssetTransfersCategory.ERC20, 
      AssetTransfersCategory.ERC721, 
      AssetTransfersCategory.ERC1155
    ]
  });

  return data.transfers;
};
