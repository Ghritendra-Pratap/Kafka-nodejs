import { faker } from "@faker-js/faker/.";
import { ICatalogRepository } from "../../interfaces/catalogRepository.interface";
import { MockCatalogRepository } from "../../repository/MockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { Product } from "../../modals/product.modal";
import {Factory} from 'rosie'


const mockProductList = new Factory<Product>()
    .attr("id", () => faker.number.int({ min: 1, max: 100 }))
    .attr("name", () => faker.commerce.productName())
    .attr("description", () => faker.commerce.productDescription())
    .attr("stock", () => faker.number.int({ min: 10, max: 100 }))
    .attr("price", () => +faker.commerce.price())

const mockProduct = (rest : any)=> {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 10, max: 100 }),
        ...rest
    }
}



describe("CatalogService", () => {

    let repository : ICatalogRepository
    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository
    });
    
    describe("createProduct", () => {

        test("should create product", async()=>{
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price : +faker.commerce.price()
            })
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number)
            });
        })

        test("should throw an error" , ()=>{
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })

            jest.spyOn(repository, "create").mockImplementationOnce(()=>
                Promise.resolve({} as Product)
            )

            expect(service.createProduct(reqBody)).rejects.toThrow(
                "unable to create product"
            )
        })

        test("should throw an error with Product already exist" , ()=>{
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })

            jest.spyOn(repository, "create").mockImplementationOnce(()=>
                Promise.reject(new Error("Product already exists"))
            )

            expect(service.createProduct(reqBody)).rejects.toThrow(
                "Product already exists"
            )
        })


    })

    describe("should update product", ()=>{
        test("should create product", async()=>{
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price : +faker.commerce.price(),
                id: +faker.number.int()
            })
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody);
        })

        test("should throw an error" , ()=>{
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })

            jest.spyOn(repository, "update").mockImplementationOnce(() => 
                Promise.reject(new Error("Product does not exist"))
            )
        

            expect(service.updateProduct({} as unknown as Product)).rejects.toThrow(
                "Product does not exist"
            )
        })
    })

    describe("getProducts", () => {
        test("should get products by offset and limit" , async()=>{
            const service = new CatalogService(repository);
            const limit = +faker.number.int({min:10 , max:50});
            const products = mockProductList.buildList(limit)
            jest.spyOn(repository, "find").mockImplementationOnce(()=>
                Promise.resolve(products)
            )
            const result = await service.getProducts(limit , 0);
            expect(result.length).toEqual(limit);
            expect(result).toMatchObject(products)
        })

        test("should throw error with products does not exist" , async()=>{
            const service = new CatalogService(repository);
            jest.spyOn(repository, "find").mockImplementationOnce(()=>
                Promise.reject(new Error("Products does not exist"))
            )
            await expect(service.getProducts(0, 0)).rejects.toThrow("Products does not exist");
            
        })
    })

    describe("getProduct", () => {
        test("should get product by id" , async()=>{
            const service = new CatalogService(repository);
            const product = mockProductList.build()
            console.log(product)
            jest.spyOn(repository, "findOne").mockImplementationOnce(()=>
                Promise.resolve(product)
            )
            const result = await service.getProduct(product.id!);
            
            expect(result).toMatchObject(product)
        })

        test("should throw error with product does not exist" , async()=>{
            const service = new CatalogService(repository);
            jest.spyOn(repository, "findOne").mockImplementationOnce(()=>
                Promise.reject(new Error("Product does not exist"))
            )
            await expect(service.getProduct(0)).rejects.toThrow("Product does not exist");
        })
    })
});