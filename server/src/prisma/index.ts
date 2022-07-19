import { PrismaClient } from "@prisma/client";

class PrismaSingleton extends PrismaClient {
  private static instance: PrismaSingleton;

  private constructor() {
    super();
  }

  public static getInstance(): PrismaSingleton {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaSingleton();
    }

    return PrismaSingleton.instance;
  }
}

export const prismaService = PrismaSingleton.getInstance();
