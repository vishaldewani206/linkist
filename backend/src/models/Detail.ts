import { model, ObjectId, Schema } from "mongoose";

interface IDetail{
  user: ObjectId,
  page: ObjectId,
  links: ObjectId,
  bio: string,
}

const detailSchema = new Schema<IDetail>({
  user:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: "Page"
  },
  links: [{
    type: Schema.Types.ObjectId,
    ref: "Link"
  }]
}, {timestamps:true})


const Detail = model<IDetail>("Detail", detailSchema)

export {type IDetail,Detail}