import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContact,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web.js";

describe("POST /api/contacts/:contactId/address", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create new address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "Jalan apa",
        city: "Kota apa",
        province: "Provinsi apa",
        country: "Negara apa",
        postal_code: "12345",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Jalan apa");
    expect(result.body.data.city).toBe("Kota apa");
    expect(result.body.data.province).toBe("Provinsi apa");
    expect(result.body.data.country).toBe("Negara apa");
    expect(result.body.data.postal_code).toBe("12345");
  });

  it("should reject if address request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "Jalan apa",
        city: "Kota apa",
        province: "Provinsi apa",
        country: "",
        postal_code: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "Jalan apa",
        city: "Kota apa",
        province: "Provinsi apa",
        country: "Indonesia",
        postal_code: "12345",
      });

    expect(result.status).toBe(404);
  });
});
