import { ICatalogRepository } from "../interfaces/catalogRepository.interface";
import { Product } from "../modals/product.modal";

export class CatalogService{

    private _repository : ICatalogRepository
    constructor(repository : ICatalogRepository){
        this._repository = repository
    }
    async createProduct(input:Product){
        const data = await this._repository.create(input)

        if(!data.id){
            throw new Error("unable to create product")
        }
        return data

    }

    async updateProduct(data: Product){
        const da = await this._repository.update(data);
        return da
    }

    async getProducts(limit:number , offset:number){
        const products = await this._repository.find(limit , offset)
        return products  
    }

    async getProduct(id:number){
        const product = await this._repository.findOne(id)
        return product
    }

    deleteProduct(id:number){

    }
}