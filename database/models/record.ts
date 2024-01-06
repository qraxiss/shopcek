import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: { collection: 'record', versionKey: false },
    options: { allowMixed: 0 }
})
export class Record {
    @prop({ required: true, unique: true })
    public hash!: string

    @prop({ required: true })
    public status: 'sended' | 'pending' | 'error' = 'pending'
}

export const RecordModel = getModelForClass(Record)
