export interface Bike {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  created?: string;
  createdAt: string;
  vendor: string;
  image?: string;
  updated?: string;
  totalInventory: number;
  availableForSale: boolean;
  priceRange: {
    minPrice: Price;
    maxPrice: Price;
  }
}

interface Price {
  currencyCode: string;
  amount: number;
}
