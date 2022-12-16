const mongoose = require("mongoose");

const TermsAndConditionsSchema = mongoose.Schema(
  {
    TermsAndConditions:String,
    PrivacyPolicy:String,
    AboutUs:String
  },
);

module.exports = mongoose.model("TermsAndConditions", TermsAndConditionsSchema);
