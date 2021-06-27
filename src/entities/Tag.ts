import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Expose } from "class-transformer"

@Entity("tags")
class Tag {
    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string
        
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Expose({ name: "name_custom"})
    nameCustom(): string {
        return `#${this.name}`
    }

    constructor () {
        // se for um novo usuário cria um id usando o uuid
        if (!this.id) { // se o id for nulo, undefined 
            this.id = uuid()
        }
    }
}

export { Tag }