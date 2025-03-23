import {Controller, Get, Inject, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {ObjectId} from "mongodb";

@Controller()
export class AppController {
    constructor(
        @Inject('MONGO_CLIENT')
        private readonly db: any) {
    }

    @Get("/get_all")
    async getAll(@Req() request: Request, @Res() response: Response) {
        const documents = await this.db.collection("equipments").find({}).toArray();

        const result = documents.map((document) => this.toDocumentEntity(document));

        response.json(result);
    }

    @Post("/create")
    async create(@Req() request: Request, @Res() response: Response) {
        const body = request.body;
        await this.db.collection("equipments").insertOne(body);

        response.json({message: "Equipment created"});
    }

    @Post("/delete")
    async delete(@Req() request: Request, @Res() response: Response) {
        const id = request.body.id;

        await this.db.collection("equipments").deleteOne({_id: new ObjectId(id)});

        response.json({message: "Equipment deleted"});
    }

    @Post("/update")
    async update(@Req() request: Request, @Res() response: Response) {
        const {id, StockQuantity} = request.body;

        await this.db.collection("equipments").updateOne({_id: new ObjectId(id)}, {$set: {StockQuantity: StockQuantity}});

        response.json({message: "Equipment updated"});
    }

    private toDocumentEntity(document: any) {
        return {
            ...document,
            _id: document._id.toHexString()
        }
    }
}
