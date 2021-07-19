from PIL import Image
import easyocr
from gdetect.utils import config

reader = easyocr.Reader(lang_list=["en"], gpu=False)


@config.link(option="guards.id_info_validation")
def verify_idinfo(text: str, raw_img) -> bool:
    result = reader.readtext(raw_img)

    if text in result:
        return True
    else:
        return False
