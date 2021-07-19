from PIL import Image
import easyocr

reader = easyocr.Reader(lang_list=["en"], gpu=False)


def verify_idinfo(text: str, raw_img) -> bool:
    result = reader.readtext(raw_img)
    print(result)
    if text in result:
        return True
    else:
        return False
