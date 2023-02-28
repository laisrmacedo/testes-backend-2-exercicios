import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { LoginInputDTO, SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO"
import { BaseError } from "../errors/BaseError"

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {}

    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.signup(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.login(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const output = await this.userBusiness.getAll()

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string
            const output = await this.userBusiness.getById(id)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string
            await this.userBusiness.delete(id)

            res.status(200).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}