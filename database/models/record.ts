import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: { collection: 'events', versionKey: false },
    options: { allowMixed: 0 }
})
export class Record {
    @prop({ required: true, unique: true })
    public hash!: string

    @prop({ required: true })
    public wallet!: string

    @prop({ required: true, unique: true })
    public userId!: string

    @prop({ required: true, unique: true })
    public optInId!: string
}

export const RecordModel = getModelForClass(Record)
