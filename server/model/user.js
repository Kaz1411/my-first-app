const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
//const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  //author: ObjectId,
  username: {
    type: String,
    required: true,
    max: [60, "ユーザー名は最大６０文字までです"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    max: [60, "Eメールは最大60文字までです"],
  },
  password: {
    type: String,
    required: true,
    max: [30, "パスワードは最大30文字までです"],
    min: [6, "６文字以上で入力してください"],
  },
});

UserSchema.methods.hasSamePassword = function (inputPassword) {
  const user = this;
  return bcrypt.compareSync(inputPassword, user.password);
};
/*********************************************/
UserSchema.pre("save", function (next) {
  const user = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      // Store hash in your password DB.
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
