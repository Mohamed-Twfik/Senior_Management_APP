import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true })
  date: Date;
  
  @Prop({
    required: true,
    ref: 'Worker'
  })
  worker: Types.ObjectId;

  @Prop()
  price?: number;

  @Prop()
  createdAtArabic?: string;

  @Prop()
  updatedAtArabic?: string;

  @Prop()
  arabicDate?: string;

  @Prop({
    required: true,
    ref: 'User'
  })
  createdBy: Types.ObjectId;

  @Prop({
    required: true,
    ref: 'User'
  })
  updatedBy: Types.ObjectId;
}

const AttendanceSchema = SchemaFactory.createForClass(Attendance);
AttendanceSchema.index({ date: 1, worker: 1 }, { unique: true });

AttendanceSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAtArabic = arabicDateFormatter.format(new Date());
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  } else if (this.isModified()) {
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  }
  if (this.isModified('date')) {
    this.arabicDate = arabicDateFormatter.format(this.date);
  }
});

export { AttendanceSchema };

export type AttendanceDocument = Attendance & Document<Types.ObjectId>;