import { ICatalogRepository } from "../interfaces/catalogRepository.interface";
import { Product } from "../modals/product.modal";

export class CatalogRepository implements ICatalogRepository {
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}