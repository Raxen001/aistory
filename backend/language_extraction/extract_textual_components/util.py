from langextract.core.data import Extraction


def get_characters(ec, extraction: Extraction, data):
    character_dict = data.setdefault(ec.CHARACTERS_OBJ, {})
    # check if character Alias match.
    # if not then use a new character object
    for key, val in character_dict.items():
        if (
            val
            and val.get(ec.CHARACTER_ALIAS, False)
            and extraction.extraction_text in val[ec.CHARACTER_ALIAS]
        ):
            character = val
            break
    else:
        character = character_dict.setdefault(extraction.extraction_text, {})

    character.setdefault(ec.CHARACTER_NAME, extraction.extraction_text)
    add_pos_data(extraction, character)

    aliases = character.setdefault(ec.CHARACTER_ALIAS, [])
    if extraction.attributes:
        aliases.extend(extraction.attributes[ec.CHARACTER_ALIAS])


# TODO:
# for now setting and time are generated for the entire context sent.
# future parse setting and time based on the partial contexts.
# i.e, if user changes time and setting in a single chapter multiple times. The
# we should be able to figure it out.
def get_setting(extraction: Extraction, data):
    setting = data.setdefault(ec.SETTING, {})
    setting.setdefault(ec.VAL_KEY, extraction.extraction_text)
    add_pos_data(extraction, setting)


def get_time(extraction: Extraction, data):
    time = data.setdefault(ec.TIME, {})
    time.setdefault(ec.VAL_KEY, extraction.extraction_text)
    add_pos_data(extraction, time)


def get_summary(extraction: Extraction, data):
    summary = data.setdefault(ec.SUMMARY, {})
    summary.setdefault(ec.VAL_KEY, extraction.extraction_text)
    add_pos_data(extraction, summary)


def add_pos_data(extraction: Extraction, data):
    if not extraction.char_interval:
        return

    pos = {}
    pos_list = data.setdefault(ec.POS, [])

    pos.setdefault(ec.START_POS, extraction.char_interval.start_pos)
    pos.setdefault(ec.END_POS, extraction.char_interval.end_pos)
    pos_list.append(pos)
