import langextract
import textwrap


def extract_characters(input_text):
    PROMPT = textwrap.dedent(
        """\
        Extract 
          - Character names (alias, and same user should be treated the same)
          - Character description 
          - Setting in which the text takes place in
          - Time of the day/night/evening/afternoon
          - Concise of the story
        present in this text.
        Use exact character names.
        """
    )

    EXAMPLE_TEXT = textwrap.dedent(
        """\
        Chapter One
        Bronwyn
        Monday, September 24, 2:55 p.m.
        A sex tape. A pregnancy scare. Two cheating scandals. And that’s just this
        week’s update. If all you knew of Bayview High was Simon Kelleher’s
        gossip app, you’d wonder how anyone found time to go to class.
        “Old news, Bronwyn,” says a voice over my shoulder. “Wait till you see
        tomorrow’s post.”
        Damn. I hate getting caught reading About That, especially by its creator.
        I lower my phone and slam my locker shut. “Whose lives are you ruining
        next, Simon?”
        Simon falls into step beside me as I move against the flow of students
        heading for the exit. “It’s a public service,” he says with a dismissive wave.
        “You tutor Reggie Crawley, don’t you? Wouldn’t you rather know he has a
        camera in his bedroom?”
        I don’t bother answering. Me getting anywhere near the bedroom of
        perpetual stoner Reggie Crawley is about as likely as Simon growing a
        conscience.
        “Anyway, they bring it on themselves. If people didn’t lie and cheat, I’d
        be out of business.” Simon’s cold blue eyes take in my lengthening strides.
        “Where are you rushing off to? Covering yourself in extracurricular glory?”
        I wish. As if to taunt me, an alert crosses my phone: Mathlete practice, 3
        p.m., Epoch Coffee. Followed by a text from one of my teammates: Evan’s
        here.
        """
    )

    EXAMPLES = [
        langextract.data.ExampleData(
            text=EXAMPLE_TEXT,
            extractions=[
                langextract.data.Extraction(
                    extraction_class="character_name",
                    extraction_text="Bronwyn",
                ),
                langextract.data.Extraction(
                    extraction_class="character_name",
                    extraction_text="Simon Kelleher",
                    attributes={
                        "alias": ["simon"]
                    }
                ),
                langextract.data.Extraction(
                    extraction_class="character_name",
                    extraction_text="Reggie Crawley",
                ),
                langextract.data.Extraction(
                    extraction_class="setting",
                    extraction_text="Bayview High School hallway and nearby locker area",
                ),
                langextract.data.Extraction(
                    extraction_class="time",
                    extraction_text="Monday, September 24, 2:55 p.m.",
                ),
                langextract.data.Extraction(
                    extraction_class="summary",
                    extraction_text="Bronwyn is caught reading an infamous school gossip app by its creator, Simon, who relishes the chaos his updates cause; school rumors and scandals are discussed, exposing the stressful social environment at Bayview High as students move through their day.",
                ),
            ],
        )
    ]

    result = langextract.extract(
        text_or_documents=input_text,
        prompt_description=PROMPT,
        examples=EXAMPLES,
        model_id="gemini-2.5-flash",
    )

    return result


def write_jsonl(annotated_doc):
    langextract.io.save_annotated_documents(
        [annotated_doc], output_name="conciser.jsonl", output_dir="../output/"
    )

    html_content = langextract.visualize("../output/conciser.jsonl")
    with open("../output/visualization.html", "w") as f:
        if hasattr(html_content, "data"):
            f.write(html_content.data)
        else:
            f.write(html_content)



if __name__ == "__main__":

    EXAMPLE_TEXT = textwrap.dedent(
        """\
        Chapter One
        Bronwyn
        Monday, September 24, 2:55 p.m.
        A sex tape. A pregnancy scare. Two cheating scandals. And that’s just this
        week’s update. If all you knew of Bayview High was Simon Kelleher’s
        gossip app, you’d wonder how anyone found time to go to class.
        “Old news, Bronwyn,” says a voice over my shoulder. “Wait till you see
        tomorrow’s post.”
        Damn. I hate getting caught reading About That, especially by its creator.
        I lower my phone and slam my locker shut. “Whose lives are you ruining
        next, Simon?”
        Simon falls into step beside me as I move against the flow of students
        heading for the exit. “It’s a public service,” he says with a dismissive wave.
        “You tutor Reggie Crawley, don’t you? Wouldn’t you rather know he has a
        camera in his bedroom?”
        I don’t bother answering. Me getting anywhere near the bedroom of
        perpetual stoner Reggie Crawley is about as likely as Simon growing a
        conscience.
        “Anyway, they bring it on themselves. If people didn’t lie and cheat, I’d
        be out of business.” Simon’s cold blue eyes take in my lengthening strides.
        “Where are you rushing off to? Covering yourself in extracurricular glory?”
        I wish. As if to taunt me, an alert crosses my phone: Mathlete practice, 3
        p.m., Epoch Coffee. Followed by a text from one of my teammates: Evan’s
        here.
        """
    )

    annotated_doc = extract_characters(EXAMPLE_TEXT)
    print(annotated_doc)
    write_jsonl(annotated_doc)
