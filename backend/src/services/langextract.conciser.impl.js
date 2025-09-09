import {extract } from 'langextract';
import Conciser from './conciser.service.js'


const exampleData = [
  {
    text: "Lisa looked at the empty chair and sighed.\n'He said he'd be here,' she whispered.",
    extractions: [
      {
        extractionClass: "setting",
        extractionText: "Real World",
        attributes: {}
      },
      {
        extractionClass: "timeOfDay",
        extractionText: "Evening",
        attributes: {}
      },
      {
        extractionClass: "location",
        extractionText: "a quiet room with an empty chair",
        attributes: {}
      },
      {
        extractionClass: "story",
        extractionText: "Lisa waits for James, who has let her down despite usually keeping his promises.",
        attributes: {}
      },
      {
        extractionClass: "character",
        extractionText: "Lisa",
        attributes: {
          "personName": "Lisa",
          "personAlias": [],
          "personGender": "FEMALE",
          "personDescription": "Disappointed and alone, likely has expressive features and a quiet demeanor."
        }
      },
      {
        extractionClass: "character",
        extractionText: "James",
        attributes: {
          personName: "James",
          personAlias: [],
          personGender: "MALE",
          personDescription: "Absent from the scene. Known for keeping promises. Possibly close to Lisa."
        }
      }
    ]
  }
]



class LangExtract extends Conciser {
  async conciseThisText() {

    const result = await extract("Alice Johnson is 25 and works at Microsoft.", {
      promptDescription: `Extract structured story metadata from the passage below. Do not assume details,

      Output in JSON format:

      {
        "setting": "...",
        "timeOfDay": "...",
        "location": "...",
        "story": "...",
        "characterList": [...]
      }
      ` ,
      examples: exampleData,
      modelType: "gemini", //change this for the model
      apiKey: process.env.LANGEXTRACT_API_KEY // change this api key respective to the model
    });
    console.log(result.extractions);
  }
}

export default LangExtract;