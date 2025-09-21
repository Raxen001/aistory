import langextract as lx
import textwrap


def main():
    # 1. Define the prompt and extraction rules
    prompt = textwrap.dedent(
        """\
        Extract characters, emotions, and relationships in order of appearance.
        Use exact text for extractions. Do not paraphrase or overlap entities.
        Provide meaningful attributes for each entity to add context."""
    )

    # 2. Provide a high-quality example to guide the model
    examples = [
        lx.data.ExampleData(
            text="ROMEO. But soft! What light through yonder window breaks? It is the east, and Juliet is the sun.",
            extractions=[
                lx.data.Extraction(
                    extraction_class="character",
                    extraction_text="ROMEO",
                    attributes={"emotional_state": "wonder"},
                ),
                lx.data.Extraction(
                    extraction_class="emotion",
                    extraction_text="But soft!",
                    attributes={"feeling": "gentle awe"},
                ),
                lx.data.Extraction(
                    extraction_class="relationship",
                    extraction_text="Juliet is the sun",
                    attributes={"type": "metaphor"},
                ),
                lx.data.Extraction(
                    extraction_class="gender",
                    extraction_text="Juliet is the sun",
                    attributes={"gender": "male"},
                ),
            ],
        )
    ]

    # The input text to be processed
    input_text = "Lady Juliet gazed longingly at the stars, her heart aching for Romeo"

    # Run the extraction
    result = lx.extract(
        text_or_documents=input_text,
        prompt_description=prompt,
        examples=examples,
        model_id="gemini-2.5-flash",
        api_key="AIzaSyAJ9kmkm25U0Q6Ch20-K61A6puB202TP6M",
    )
    lx.io.save_annotated_documents(
        [result], output_name="extraction_results.jsonl", output_dir="../output/"
    )

    html_content = lx.visualize("../output/extraction_results.jsonl")
    with open("../output/visualization.html", "w") as f:
        if hasattr(html_content, "data"):
            f.write(html_content.data)  # For Jupyter/Colab
        else:
            f.write(html_content)


if __name__ == "__main__":
    main()
