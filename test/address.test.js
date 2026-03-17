import supertest from "supertest";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContact,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web.js";

// describe("POST /api/contacts/:contactId/address", function () {
//   beforeEach(async () => {
//     await createTestUser();
//     await createTestContact();
//   });

//   afterEach(async () => {
//     await removeAllTestAddresses();
//     await removeAllTestContact();
//     await removeTestUser();
//   });

//   it("should can create new address", async () => {
//     const testContact = await getTestContact();

//     const result = await supertest(web)
//       .post("/api/contacts/" + testContact.id + "/addresses")
//       .set("Authorization", "test")
//       .send({
//         street: "Jalan apa",
//         city: "Kota apa",
//         province: "Provinsi apa",
//         country: "Negara apa",
//         postal_code: "12345",
//       });

//     expect(result.status).toBe(200);
//     expect(result.body.data.id).toBeDefined();
//     expect(result.body.data.street).toBe("Jalan apa");
//     expect(result.body.data.city).toBe("Kota apa");
//     expect(result.body.data.province).toBe("Provinsi apa");
//     expect(result.body.data.country).toBe("Negara apa");
//     expect(result.body.data.postal_code).toBe("12345");
//   });

//   it("should reject if address request is invalid", async () => {
//     const testContact = await getTestContact();

//     const result = await supertest(web)
//       .post("/api/contacts/" + testContact.id + "/addresses")
//       .set("Authorization", "test")
//       .send({
//         street: "Jalan apa",
//         city: "Kota apa",
//         province: "Provinsi apa",
//         country: "",
//         postal_code: "",
//       });

//     expect(result.status).toBe(400);
//   });

//   it("should reject if contact is not found", async () => {
//     const testContact = await getTestContact();

//     const result = await supertest(web)
//       .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
//       .set("Authorization", "test")
//       .send({
//         street: "Jalan apa",
//         city: "Kota apa",
//         province: "Provinsi apa",
//         country: "Indonesia",
//         postal_code: "12345",
//       });

//     expect(result.status).toBe(404);
//   });
// });

// describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
//   beforeEach(async () => {
//     await createTestUser();
//     await createTestContact();
//     await createTestAddress();
//   });

//   afterEach(async () => {
//     await removeAllTestAddresses();
//     await removeAllTestContact();
//     await removeTestUser();
//   });

//   it("should can get contact", async () => {
//     const testContact = await getTestContact();
//     const testAddress = await getTestAddress();

//     const result = await supertest(web)
//       .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
//       .set("Authorization", "test");

//     expect(result.status).toBe(200);
//     expect(result.body.data.id).toBeDefined();
//     expect(result.body.data.street).toBe("Jalan apa");
//     expect(result.body.data.city).toBe("Kota apa");
//     expect(result.body.data.province).toBe("Provinsi apa");
//     expect(result.body.data.country).toBe("Negara apa");
//     expect(result.body.data.postal_code).toBe("12345");
//   });

//   it("should reject if contact is not found", async () => {
//     const testContact = await getTestContact();
//     const testAddress = await getTestAddress();

//     const result = await supertest(web)
//       .get(
//         "/api/contacts/" +
//           (testContact.id + 1) +
//           "/addresses/" +
//           testAddress.id,
//       )
//       .set("Authorization", "test");

//     expect(result.status).toBe(404);
//   });

//   it("should reject if address is not found", async () => {
//     const testContact = await getTestContact();
//     const testAddress = await getTestAddress();

//     const result = await supertest(web)
//       .get(
//         "/api/contacts/" +
//           testContact.id +
//           "/addresses/" +
//           (testAddress.id + 1),
//       )
//       .set("Authorization", "test");

//     expect(result.status).toBe(404);
//   });
// });

describe("PUT /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "Negara",
        postal_code: "12345678",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("Jalan");
    expect(result.body.data.city).toBe("Kota");
    expect(result.body.data.province).toBe("Provinsi");
    expect(result.body.data.country).toBe("Negara");
    expect(result.body.data.postal_code).toBe("12345678");
  });

  it("should reject if request is not valid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "",
        postal_code: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if address is not valid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" +
          testContact.id +
          "/addresses/" +
          (testAddress.id + 1),
      )
      .set("Authorization", "test")
      .send({
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "Negara",
        postal_code: "12345678",
      });

    expect(result.status).toBe(404);
  });

  it("should reject if address is not valid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" +
          (testContact.id + 1) +
          "/addresses/" +
          testAddress.id,
      )
      .set("Authorization", "test")
      .send({
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "Negara",
        postal_code: "12345678",
      });

    expect(result.status).toBe(404);
  });
});
