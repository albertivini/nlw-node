import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {
    @PrimaryColumn()
    readonly id: string

    @Column()
    user_sender: string

    // relacionamento onde um usuario envia muitos elogios
    @JoinColumn({name: "user_sender"})
    @ManyToOne(()=> User)
    userSender: User
    
    @Column()
    user_receiver: string

    // relacionamento onde um usuario recebe muitos elogios
    @JoinColumn({name: "user_receiver"})
    @ManyToOne(()=> User)
    userReceiver: User

    @Column()
    tag_id: string

    // dando join direto pela entidade
    // relacionamento onde uma tag pode estar em muitos elogios
    @JoinColumn({ name: "tag_id"})
    @ManyToOne(() => Tag)
    tag: Tag

    @Column()
    message: string
    
    @CreateDateColumn()
    created_at: Date

    constructor () {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Compliment }