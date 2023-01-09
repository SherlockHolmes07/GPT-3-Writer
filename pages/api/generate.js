import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  let baseCompletion;
  if (req.body.app === "Essay"){
    res.status(200).json({ output: "HEYY Dude!!" });
  }
  else if (req.body.app === "Grammer") {
    const basePromptPrefix = `Correct the grammer and spelling of the given text.\nText: `;
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
    baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${basePromptPrefix}${req.body.userInput}\nCorrected Text: `,
      temperature: 0.4,
      max_tokens: 1400,
    });
    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
  } 
};

export default generateAction;
