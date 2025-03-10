import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";

@Schema({ timestamps: true })
export class PriceType {
  @Prop({
    required: true,
    unique: true
  })
  name: string;

  @Prop({
    required: true,
    type: [{
      department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
      price: Number
    }]
  })
  departmentsPrice: { department: Types.ObjectId; price: number }[];

  @Prop()
  createdAtArabic?: string;

  @Prop()
  updatedAtArabic?: string;

  @Prop({
    required: true,
    ref: 'User',
  })
  createdBy: Types.ObjectId;

  @Prop({
    required: true,
    ref: 'User',
  })
  updatedBy: Types.ObjectId;
}

const PriceTypeSchema = SchemaFactory.createForClass(PriceType);

PriceTypeSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAtArabic = arabicDateFormatter.format(new Date());
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  } else if (this.isModified()) {
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  }
  next();
});

export { PriceTypeSchema };

export type PriceTypeDocument = PriceType & Document<Types.ObjectId>;