import { Product } from "../modals/product.modal";

export interface ICatalogRepository {
    find(limit : number , offset : number): Promise<Product[]>;
    findOne(id: number): Promise<any>;
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: number): Promise<any>;
}