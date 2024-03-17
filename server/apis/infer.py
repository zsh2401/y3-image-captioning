import numpy as np
from PIL import Image
from flask import Flask, request

from infer import create_infer_fn
from server.apis.scheme import success
from server.opts import word_map_path, model_path

model = None


def register_infer_apis(app):
    @app.route('/api/infer', methods=['POST'])
    def infer():
        images = request.files.getlist("images")
        method = request.form.get("method")

        global model
        if model is None:
            model = create_infer_fn("cuda", word_map_path, model_path, 5)

        result = model(__to_tensors(images))

        return success({
            "captions": result,
            "method": method
        })


def __to_tensors(form_files):
    result = []
    for file in form_files:
        image = Image.open(file.stream)
        # 转换图像为 NumPy 数组
        image_np = np.array(image)
        result.append(image_np)

    return result
