const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "20mb",
  })
);

// ======================================================
// CONFIGURATION
// ======================================================

const PORT = process.env.PORT || 5000;

const PLANT_ID_API_KEY =
  process.env.PLANT_ID_API_KEY;

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY;

// Do NOT print the actual keys.
console.log(
  "Plant.id key loaded:",
  PLANT_ID_API_KEY ? "YES" : "NO"
);

console.log(
  "Gemini key loaded:",
  GEMINI_API_KEY ? "YES" : "NO"
);

// ======================================================
// TEST BACKEND
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "🌿 AI Plant Doctor backend is running!",
  });
});

// ======================================================
// PLANT.ID HEALTH ANALYSIS
// ======================================================

app.post(
  "/api/plant-health",
  async (req, res) => {
    try {
      const { image } = req.body;

      if (!image) {
        return res.status(400).json({
          success: false,
          error:
            "Plant image is required.",
        });
      }

      if (!PLANT_ID_API_KEY) {
        return res.status(500).json({
          success: false,
          error:
            "PLANT_ID_API_KEY is missing from .env",
        });
      }

      console.log(
        "🌿 Sending plant image to Plant.id..."
      );

      const response = await fetch(
        "https://plant.id/api/v3/health_assessment?details=local_name,description,treatment,classification,common_names",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "Api-Key":
              PLANT_ID_API_KEY,
          },

          body: JSON.stringify({
            images: [image],
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "Plant.id status:",
        response.status
      );

      if (!response.ok) {
        console.error(
          "Plant.id error:",
          data
        );

        return res
          .status(response.status)
          .json({
            success: false,

            error:
              "Plant disease detection failed.",

            details: data,
          });
      }

      return res.json(data);
    } catch (error) {
      console.error(
        "Plant analysis error:",
        error
      );

      return res.status(500).json({
        success: false,

        error:
          "Unable to analyze plant.",

        details:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  }
);

// ======================================================
// TRANSLATION USING GEMINI
// ======================================================

app.post(
  "/api/translate",
  async (req, res) => {
    try {
      const {
        targetLanguage,

        plant = "",

        disease = "",

        description = "",

        treatment = [],

        suggestions = [],
      } = req.body;

      // ==================================================
      // CLEAN DATA
      // ==================================================

      const safeTreatment =
        Array.isArray(treatment)
          ? treatment
              .map((item) => {
                if (
                  typeof item ===
                  "string"
                ) {
                  return item;
                }

                if (
                  item &&
                  typeof item ===
                    "object"
                ) {
                  return (
                    item.name ||
                    item.description ||
                    JSON.stringify(
                      item
                    )
                  );
                }

                return "";
              })
              .filter(Boolean)
          : [];

      const safeSuggestions =
        Array.isArray(suggestions)
          ? suggestions
              .map((item) => {
                if (
                  typeof item ===
                  "string"
                ) {
                  return item;
                }

                if (
                  item &&
                  typeof item ===
                    "object"
                ) {
                  return (
                    item.name ||
                    item.disease ||
                    item.description ||
                    ""
                  );
                }

                return "";
              })
              .filter(Boolean)
          : [];

      // ==================================================
      // ENGLISH
      // ==================================================

      if (
        !targetLanguage ||
        targetLanguage === "en"
      ) {
        return res.json({
          success: true,

          language: "en",

          plant,

          disease,

          description,

          treatment:
            safeTreatment,

          suggestions:
            safeSuggestions,
        });
      }

      // ==================================================
      // SUPPORTED LANGUAGES
      // ==================================================

      const languages = {
        mr: "Marathi",
        hi: "Hindi",
      };

      const target =
        languages[targetLanguage];

      if (!target) {
        return res.status(400).json({
          success: false,

          error:
            "Unsupported language. Use en, mr, or hi.",
        });
      }

      // ==================================================
      // CHECK GEMINI KEY
      // ==================================================

      if (!GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,

          error:
            "GEMINI_API_KEY is missing from .env",
        });
      }

      console.log(
        `🌐 Translating plant information to ${target}...`
      );

      // ==================================================
      // GEMINI PROMPT
      // ==================================================

      const prompt = `
You are a translation service for a plant disease application.

Translate ALL of the supplied plant information into ${target}.

Rules:

1. Translate the complete plant name when an appropriate translation exists.

2. Translate the complete disease name.

3. Translate the ENTIRE description. Do not summarize it.

4. Translate EVERY treatment item completely.

5. Translate EVERY possible-condition/suggestion item completely.

6. Preserve the original agricultural and scientific meaning.

7. Do not invent new symptoms, diagnoses, treatments, medicines, chemicals, dosages, or advice.

8. Do not remove information.

9. Write natural and understandable ${target}.

10. Return ONLY JSON.

Return exactly:

{
  "plant": "",
  "disease": "",
  "description": "",
  "treatment": [],
  "suggestions": []
}

Original information:

Plant:
${plant}

Disease:
${disease}

Description:
${description}

Treatment:
${JSON.stringify(safeTreatment)}

Possible conditions:
${JSON.stringify(safeSuggestions)}
`;

      // ==================================================
      // CALL GEMINI
      // ==================================================

      const geminiResponse =
        await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "x-goog-api-key":
                GEMINI_API_KEY,
            },

            body: JSON.stringify({
              contents: [
                {
                  role: "user",

                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
            }),
          }
        );

      // ==================================================
      // READ GEMINI RESPONSE
      // ==================================================

      const geminiData =
        await geminiResponse.json();

      console.log(
        "Gemini status:",
        geminiResponse.status
      );

      if (!geminiResponse.ok) {
        console.error(
          "Gemini API error:",
          JSON.stringify(
            geminiData,
            null,
            2
          )
        );

        return res
          .status(
            geminiResponse.status
          )
          .json({
            success: false,

            error:
              "Gemini translation service failed.",

            details:
              geminiData,
          });
      }

      // ==================================================
      // GET GENERATED TEXT
      // ==================================================

      let translatedText =
        geminiData?.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text;

      if (!translatedText) {
        console.error(
          "Empty Gemini response:",
          geminiData
        );

        return res.status(500).json({
          success: false,

          error:
            "Gemini returned an empty translation.",
        });
      }

      // ==================================================
      // REMOVE POSSIBLE MARKDOWN CODE BLOCK
      // ==================================================

      translatedText =
        translatedText
          .trim()
          .replace(
            /^```json\s*/i,
            ""
          )
          .replace(
            /^```\s*/i,
            ""
          )
          .replace(
            /\s*```$/,
            ""
          )
          .trim();

      // ==================================================
      // PARSE JSON
      // ==================================================

      let translated;

      try {
        translated =
          JSON.parse(
            translatedText
          );
      } catch (error) {
        console.error(
          "Invalid Gemini JSON:"
        );

        console.error(
          translatedText
        );

        return res.status(500).json({
          success: false,

          error:
            "Gemini returned invalid translation JSON.",

          raw:
            translatedText,
        });
      }

      // ==================================================
      // FINAL RESPONSE
      // ==================================================

      return res.json({
        success: true,

        language:
          targetLanguage,

        plant:
          translated.plant ||
          plant,

        disease:
          translated.disease ||
          disease,

        description:
          translated.description ||
          description,

        treatment:
          Array.isArray(
            translated.treatment
          )
            ? translated.treatment
            : safeTreatment,

        suggestions:
          Array.isArray(
            translated.suggestions
          )
            ? translated.suggestions
            : safeSuggestions,
      });
    } catch (error) {
      console.error(
        "Translation server error:",
        error
      );

      return res.status(500).json({
        success: false,

        error:
          "Translation failed.",

        details:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  }
);

// ======================================================
// TEST GEMINI TRANSLATION
// ======================================================

app.get(
  "/api/test-gemini",
  async (req, res) => {
    try {
      if (!GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,

          error:
            "GEMINI_API_KEY is missing from .env",
        });
      }

      const response =
        await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "x-goog-api-key":
                GEMINI_API_KEY,
            },

            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text:
                        "Translate this sentence into Marathi: The plant has a fungal disease.",
                    },
                  ],
                },
              ],
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "Gemini test status:",
        response.status
      );

      if (!response.ok) {
        return res
          .status(response.status)
          .json({
            success: false,
            details: data,
          });
      }

      console.log("=========== FINAL TRANSLATION ===========");
      console.log(JSON.stringify(translated, null, 2));
      console.log("=========================================");

      return res.json({
        success: true,

        text:
          data?.candidates?.[0]
            ?.content?.parts?.[0]
            ?.text || "",
      });
    } catch (error) {
      console.error(
        "Gemini test error:",
        error
      );

      return res.status(500).json({
        success: false,

        error:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log(
    "======================================"
  );

  console.log(
    `🌿 Plant Doctor backend: ${PORT}`
  );

  console.log(
    `🌱 Plant.id: ${
      PLANT_ID_API_KEY
        ? "READY"
        : "MISSING KEY"
    }`
  );

  console.log(
    `🌐 Gemini: ${
      GEMINI_API_KEY
        ? "READY"
        : "MISSING KEY"
    }`
  );

  console.log(
    "======================================"
  );

  console.log("");
});