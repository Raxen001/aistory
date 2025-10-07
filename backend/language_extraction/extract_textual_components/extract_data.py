import langextract
from langextract.core.data import AnnotatedDocument
import textwrap
import extract_textual_components.util as util
import logging

logger = logging.getLogger(__name__)


class Extract_details:
    PROMPT = textwrap.dedent(
        """\
        Extract 
          - Character names (alias, and same user should be treated the same)
          - Character description 
          - Setting in which the text takes place in
          - Time of the day/night/evening/afternoon
          - Summary of the story
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

    CHARACTERS_OBJ = "characters"
    CHARACTER_NAME = "name"
    CHARACTER_ALIAS = "alias"

    POS = "pos"
    VAL_KEY = "val"
    START_POS = "start_pos"
    END_POS = "end_pos"
    SETTING = "setting"
    TIME = "time"
    SUMMARY = "summary"

    def __init__(self, input_text: str, model: str = "gemini-2.5-flash"):
        self.input_text = input_text
        self.model = model

    def extract(self):
        examples = [
            langextract.data.ExampleData(
                text=self.EXAMPLE_TEXT,
                extractions=[
                    langextract.data.Extraction(
                        extraction_class=self.CHARACTER_NAME,
                        extraction_text="Bronwyn",
                    ),
                    langextract.data.Extraction(
                        extraction_class=self.CHARACTER_NAME,
                        extraction_text="Simon Kelleher",
                        attributes={"alias": ["simon"]},
                    ),
                    langextract.data.Extraction(
                        extraction_class=self.CHARACTER_NAME,
                        extraction_text="Reggie Crawley",
                    ),
                    langextract.data.Extraction(
                        extraction_class=self.SETTING,
                        extraction_text="Bayview High School hallway and nearby locker area",
                    ),
                    langextract.data.Extraction(
                        extraction_class=self.TIME,
                        extraction_text="Monday, September 24, 2:55 p.m.",
                    ),
                    langextract.data.Extraction(
                        extraction_class=self.SUMMARY,
                        extraction_text="Bronwyn is caught reading an infamous school gossip app by its creator, Simon, who relishes the chaos his updates cause; school rumors and scandals are discussed, exposing the stressful social environment at Bayview High as students move through their day.",
                    ),
                ],
            )
        ]

        result = langextract.extract(
            text_or_documents=self.input_text,
            prompt_description=self.PROMPT,
            examples=examples,
            model_id=self.model,
        )

        return result

    def ready_response(self, annotated_doc: AnnotatedDocument):
        data = {}

        if not annotated_doc or not isinstance(annotated_doc, AnnotatedDocument):
            logging.error("annotated_doc is not an istance of AnnotatedDocument")

            return data

        try:
            for extraction in annotated_doc.extractions:
                match extraction.extraction_class:
                    case self.CHARACTER_NAME:
                        util.get_characters(self, extraction, data)
                    case self.SETTING:
                        util.get_setting(self, extraction, data)
                    case self.TIME:
                        util.get_time(self, extraction, data)
                    case self.SUMMARY:
                        util.get_summary(self, extraction, data)
        except AttributeError:
            data = {}
            print("extractions doesn't exist")

        return data


if __name__ == "__main__":

    EXAMPLE_TEXT = textwrap.dedent(
        """\
        Chapter One Bronwyn Monday, September 24, 2:55 p.m.
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

    ex = Extract_details(EXAMPLE_TEXT)
    annotated_doc = ex.extract()
    json_obj = ex.ready_response(annotated_doc)
    print(json_obj)
    # ex.write_jsonl(annotated_doc)
