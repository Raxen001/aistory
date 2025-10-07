from extract_textual_components.extract_data import Extract_details
from langextract.data import AnnotatedDocument
import logging

logger = logging.getLogger(__name__)


def extract_details_from_text(input_text):
    ec = Extract_details(input_text)
    annotated_doc = ec.extract()

    if isinstance(annotated_doc, AnnotatedDocument):
        response = ec.ready_response(annotated_doc)
    else:
        logging.error("response is not a AnnotatedDocument")
        logging.error(response)

    if not response:
        logging.error("Extract_details returned unexpected output.")
        logging.error(response)

        return None

    return response
