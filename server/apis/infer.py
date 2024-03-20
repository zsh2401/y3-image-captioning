import numpy as np
import torch
from PIL import Image
from flask import request

from infer import create_infer_fn
from server.apis.scheme import success
from server.opts import word_map_path, model_path, device, beam_size
from translate.translate import translate2chn

model = None


def register_infer_apis(app):
    @app.route('/api/infer', methods=['POST'])
    def infer():
        images = request.files.getlist("images")
        method = request.form.get("method")
        tensors = __to_tensors(images)
        
        # print("what the fuck?")
        global model
        if model is None:
            model = create_infer_fn(device, word_map_path, model_path, beam_size)
        
        # print("loaded")
      
        images_captions = model(tensors)
        for i,image_captions in enumerate(images_captions):
            for j, image_caption in enumerate(image_captions):
                image_captions[j] = {
                    "source":image_caption,
                    "chn":translate2chn(image_caption)
                }

        return success({
            "captions": images_captions,
            "method": method
        })


def __to_tensors(form_files):
    from scipy.misc import imresize
    import torchvision.transforms as transforms
    # import torch
    result = []
    print("converting to tensors")
    for file in form_files:
        image = Image.open(file.stream).convert("RGB")
        
        # 转换图像为 NumPy 数组
        img = np.array(image)
        print(img.shape)
        if len(img.shape) == 2:
            img = img[:, :, np.newaxis]
            img = np.concatenate([img, img, img], axis=2)
        img = imresize(img, (256, 256))
        img = img.transpose(2, 0, 1)
        img = img / 255.
        img = torch.FloatTensor(img).to(device)
        print(img.shape)
        normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                         std=[0.229, 0.224, 0.225])
        transform = transforms.Compose([normalize])
        image = transform(img)  # (3, 256, 256)
        # Encode
        image = image.unsqueeze(0)  # (1, 3, 256, 256)
        # image = torch.from_numpy(image)
        result.append(image)
        # print(image)
        
    return result
