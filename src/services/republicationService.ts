import { RepublicationRepository } from "../repositories/republicationRepositories";
import { Republication } from "../models/republication";

export class RepublicationService {
  static async createRepublication(
    republication: Republication
  ): Promise<Republication> {
    return RepublicationRepository.createRepublication(republication);
  }

  static async getRepublicationById(id: string): Promise<Republication | null> {
    const republication = await RepublicationRepository.findById(id);
    if (!republication) {
      throw new Error("Republication non trouvée.");
    }
    return republication;
  }

  static async getRepublicationsByUserId(
    userId: string
  ): Promise<Republication[]> {
    const republications =
      await RepublicationRepository.getRepublicationsByUserId(userId);
    if (!republications || republications.length === 0) {
      throw new Error("Aucune republication trouvée pour cet utilisateur.");
    }
    return republications;
  }
}
