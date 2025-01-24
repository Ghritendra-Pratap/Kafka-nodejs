import { ICatalogRepository } from "../interfaces/catalogRepository.interface";
import { Product } from "../modals/product.modal";

export class MockCatalogRepository implements ICatalogRepository {
    find(limit:number , offset:number): Promise<Product[]> {
        return Promise.resolve([]);
    }
    findOne(id: number): Promise<any> {
        return Promise.resolve({});
    }
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id:123,
            ...data
        } as Product;
        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data);
    }
    delete(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}