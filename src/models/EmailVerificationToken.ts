import { Model, ObjectId, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}
interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificaationTokenScheme = new Schema<
  EmailVerificationTokenDocument,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now,
  },
});

emailVerificaationTokenScheme.pre("save", async function () {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }
});

emailVerificaationTokenScheme.methods.compareToken = async function (
  token: string
) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

export default model(
  "EmailVerificationToken",
  emailVerificaationTokenScheme
) as Model<EmailVerificationTokenDocument, {}, Methods>;
