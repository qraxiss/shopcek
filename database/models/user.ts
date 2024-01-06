import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: { collection: 'user', versionKey: false },
    options: { allowMixed: 0 }
})
export class User {
    @prop({ required: true, unique: true })
    public username!: string

    @prop({ required: true })
    public password!: string

    @prop({ required: true, default: {} })
    public permissions!: any
}

export const UserModel = getModelForClass(User)
