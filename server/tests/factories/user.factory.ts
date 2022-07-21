import { faker } from "@faker-js/faker";
import { hashString } from "../../src/common/utils/auth";
import { prismaService } from "../../src/prisma";

export class UserFactory {
  geretatedEmails: string[];

  constructor() {
    this.geretatedEmails = [];
  }

  randomPassword({ passwordLength = 6 } = {}) {
    return faker.internet.password(passwordLength);
  }

  newMockUser({ passwordLength = 6, wrongEmail = false } = {}) {
    let email = faker.internet.email();

    if (wrongEmail) email = "testwrongemail.com";
    else this.geretatedEmails.push(email);

    return {
      email,
      password: this.randomPassword({ passwordLength }),
    };
  }

  async registerNewUser() {
    const { email, password } = this.newMockUser();
    const hashedPassword = await hashString(password);

    await prismaService.user.create({ data: { email, password: hashedPassword } });
    return { email, password };
  }

  async deleteRegisteredUsers() {
    await prismaService.user.deleteMany({
      where: { email: { in: this.geretatedEmails } },
    });
  }
}
