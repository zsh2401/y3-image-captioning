#!/usr/bin/env python
# 为CaptionMetric生成测量指标数据

import json
from posixpath import basename
model_inference_result_file = "res.json"
expected_file = "gts.json"
def generate_gts():
    with open("./dataset/3mset/captions.txt") as f:
        lines = f.readlines()
    result = {}
    for line in lines:
        line = line.strip()
        if line == "":
            continue
        file_name = line.split("#")[0]
        caption = " ".join(line.split(" ")[1:]).strip()
        if file_name not in result:
            result[file_name] = []
        result[file_name].append(caption)
        
    with open(expected_file,"w") as f:
        json.dump(result,f)
    

def generate_res():
    from infer import create_infer_fn
    import os
    infer = create_infer_fn("cuda:1",
                                "dataset/output/WORDMAP_coco_5_cap_per_img_5_min_word_freq.json",
                                "BEST_checkpoint_coco_5_cap_per_img_5_min_word_freq.pth.tar", 5)

    
    file_paths = ["./dataset/3mset/images/" + file for file in os.listdir("./dataset/3mset/images")]

    result = {}
    for image_path,image_caption in infer(file_paths).items():
        result[basename(image_path)] = [image_caption]
        
    with open(model_inference_result_file,"w") as f:
        json.dump(result,f)

if __name__ == "__main__":
    generate_gts()
    generate_res()