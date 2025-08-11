import { RepublicationRepository } from "../repositories/republicationRepositories";
import { Republication } from "../models/republication";



export class RepublicationService {
    static async createRepublication(republication: Republication): Promise<Republication> {
     return RepublicationRepository.createRepublication(republication);
    }
}