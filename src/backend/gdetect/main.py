"""
Runs the main GDetect Algorithm
"""


from gdetect.guards import verify_filetype, verify_idinfo, verify_pictures


def process_information(
    selfie_image: bytes,
    id_image: bytes,
    full_name: str,
    email_address: str,
):

    if not verify_idinfo(full_name, id_image):
        pass

    if not verify_pictures([selfie_image, id_image]):
        pass

    return
