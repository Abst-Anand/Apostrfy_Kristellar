const SuggestionsModel = require("../models/suggestions");
const {
  getUserDetailsFromEmail,
  getUniqueCodeFromEmail,
} = require("./Getters");

async function handleShowSuggestions(req, res) {
  const uid = req.body.uid;

  const suggestions = await SuggestionsModel.findOne({ userId: uid });
  if (suggestions) {
    const suggestedUsers = suggestions.interests;
    const userInterests = Array.from(suggestions.interests.keys());

    const allSuggestions = [];

    for (let i = 0; i < userInterests.length; i++) {
      const currentInterest = userInterests[i];
      const suggestedEmails = suggestedUsers.get(currentInterest);

      for (let j = 0; j < suggestedEmails.length; j++) {
        const { name } = await getUserDetailsFromEmail(suggestedEmails[j]);
        const userid = await getUniqueCodeFromEmail(suggestedEmails[j]);
        await allSuggestions.push({
          id: userid,
          interest: currentInterest,
          name: name,
        });
      }
    }

    return res.status(200).json(allSuggestions);
  }
  return res.status(501).json({ error: "Unable to suggest users" });
}

module.exports = {
  handleShowSuggestions,
};

// let test = new Map
// test.
