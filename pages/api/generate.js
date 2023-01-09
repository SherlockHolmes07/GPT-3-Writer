import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  let baseCompletion;
  if (req.body.app === "Essay"){

    const basePromptPrefix = `Write me detailed essay in the style of George Orwell (also include some facts and figures) on the `;
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${basePromptPrefix}${req.body.userInput}\n`,
      temperature: 0.7,
      max_tokens: 1400,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();
    
    while(basePromptOutput === null){
       setTimeout(() => {
        console.log("Waiting for completion");
       }, 1000);
    }

    res.status(200).json({ output: basePromptOutput });
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
