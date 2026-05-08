
  import { model, ObjectId, Schema } from "mongoose";

interface IPage{
  user: ObjectId,
  links: ObjectId,
  theme: ObjectId,

}

const pageSchema = new Schema<IPage>({
  user:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  links: [{
    type: Schema.Types.ObjectId,
    ref: "Link"
  }],
  theme:{
    type: Schema.Types.ObjectId,
    ref: "Theme"
  }
}, {timestamps:true})


const Page = model<IPage>("Page", pageSchema)

export {type IPage,Page}