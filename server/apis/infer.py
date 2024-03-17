import numpy as np
import torch
from PIL import Image
from flask import request

from infer import create_infer_fn
from server.apis.scheme import success
from server.opts import word_map_path, model_path, device, beam_size

model = None


def register_infer_apis(app):
    @app.route('/api/infer', methods=['POST'])
    def infer():
        images = request.files.getlist("images")
        method = request.form.get("method")

        global model
        if model is None:
            model = create_infer_fn(device, word_map_path, model_path, beam_size)

        result = model(__to_tensors(images))

        return success({
            "captions": result,
            "method": method
        })


def __to_tensors(form_files):
    from scipy.misc import imresize
    import torchvision.transforms as transforms

    result = []
    for file in form_files:
        image = Image.open(file.stream)
        # 转换图像为 NumPy 数组
        img = np.array(image)

        if len(img.shape) == 2:
            img = img[:, :, np.newaxis]
            img = np.concatenate([img, img, img], axis=2)
        img = imresize(img, (256, 256))
        img = img.transpose(2, 0, 1)
        img = img / 255.
        img = torch.FloatTensor(img).to(device)
        normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                         std=[0.229, 0.224, 0.225])
        transform = transforms.Compose([normalize])
        image = transform(img)  # (3, 256, 256)
        # Encode
        image = image.unsqueeze(0)  # (1, 3, 256, 256)

        result.append(image)

    return result
