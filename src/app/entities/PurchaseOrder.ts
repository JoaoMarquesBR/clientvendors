import { Product } from './Product';
import { PurchaseOrderLineItem } from './PurchaseOrderLineItem';

export interface PurchaseOrder {
  id: number;
  vendorid: number;
  amount: number;
  items: PurchaseOrderLineItem[];
}
