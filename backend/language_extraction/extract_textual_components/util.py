from langextract.core.data import Extraction


def get_characters(ec, extraction: Extraction, data):
    character_arr = data.setdefault(ec.CHARACTERS_OBJ, [])
    # check if character Alias match.
    # if not then use a new character object
    for character_dict in character_arr:
        if character_dict.get(ec.CHARACTER_ALIAS, False) and (
            extraction.extraction_text == character_dict[ec.CHARACTER_NAME]
            or extraction.extraction_text in character_dict[ec.CHARACTER_ALIAS]
        ):
            character = character_dict

            break
    else:
        character = {}
        character_arr.append(character)

    character.setdefault(ec.CHARACTER_NAME, extraction.extraction_text)
    add_pos_data(ec, extraction, character)
    aliases = character.setdefault(ec.CHARACTER_ALIAS, [])

    if extraction.attributes:
        aliases.extend(extraction.attributes[ec.CHARACTER_ALIAS])


# TODO:
# for now setting and time are generated for the entire context sent.
# future parse setting and time based on the partial contexts.
# i.e, if user changes time and setting in a single chapter multiple times. The
# we should be able to figure it out.
def get_setting(ec, extraction: Extraction, data):
    setting = data.setdefault(ec.SETTING, {})
    setting.setdefault(ec.VAL_KEY, extraction.extraction_text)
    add_pos_data(ec, extraction, setting)


def get_time(ec, extraction: Extraction, data):
    time = data.setdefault(ec.TIME, {})
    time.setdefault(ec.VAL_KEY, extraction.extraction_text)
    add_pos_data(ec, extraction, time)


def get_summary(ec, extraction: Extraction, data):
    summary = data.setdefault(ec.SUMMARY, {})
    summary.setdefault(ec.VAL_KEY, extraction.extraction_text)
    add_pos_data(ec, extraction, summary)


def add_pos_data(ec, extraction: Extraction, data):
    if not extraction.char_interval:
        return

    pos = {}
    pos_list = data.setdefault(ec.POS, [])

    pos.setdefault(ec.START_POS, extraction.char_interval.start_pos)
    pos.setdefault(ec.END_POS, extraction.char_interval.end_pos)
    pos_list.append(pos)
