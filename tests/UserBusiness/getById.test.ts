import { UserBusiness } from "../../src/business/UserBusiness"
import { USER_ROLES } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("getById", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve retornar o Users com o ID solicitado", async () => {
        const id = "id-mock-normal"
        const response = await userBusiness.getById(id)

        expect(response).toEqual({
            id: "id-mock-normal",
            name: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            createdAt: expect.any(String), // valor dinâmico (pode ser qualquer string)
            role: USER_ROLES.NORMAL
        })
    })
})