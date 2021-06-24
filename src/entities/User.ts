import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string
    
    @Column()
    email: string

    @Column()
    admin: boolean
    
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor () {
        // se for um novo usuário cria um id usando o uuid
        if (!this.id) { // se o id for nulo, undefined 
            this.id = uuid()
        }
    }
}

export { User }