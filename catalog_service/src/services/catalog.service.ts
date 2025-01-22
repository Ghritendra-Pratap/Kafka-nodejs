import { ICatalogRepository } from "../interfaces/catalogRepository.interface";
import { Product } from "../modals/product.modal";

export class CatalogService{

    private _repository : ICatalogRepository
    constructor(repository : ICatalogRepository){
        this._repository = repository
    }
    createProduct(input:Product){

    }

    updateProduct(data: Product){

    }

    getProducts(limit:number , offset:number){

    }

    getProduct(id:number){

    }

    deleteProduct(id:number){

    }
}