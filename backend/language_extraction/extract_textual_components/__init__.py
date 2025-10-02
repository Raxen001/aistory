from extract_textual_components.extract_data import Extract_details


def extract_details_from_text(input_text):
    ec = Extract_details(input_text)
    annotated_doc = ec.extract()
    response = ec.ready_response(annotated_doc)

    if not response:
        return "[ERROR]: something went wrong with Extract_details"

    return response
