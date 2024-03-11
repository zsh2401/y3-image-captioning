#!/usr/bin/env python
# 纯粹的推理函数，不包含任何额外的信息
# Mar 11, 2024
# Seymour Zhang
import torch
import json
from PIL import Image
from caption import caption_image_beam_search

import argparse


def create_infer_fn(device, word_map_path, model, beam_size):
    print("Loading model")
    # Load model
    checkpoint = torch.load(model, map_location=str(device))
    decoder = checkpoint['decoder']
    decoder = decoder.to(device)
    decoder.eval()
    encoder = checkpoint['encoder']
    encoder = encoder.to(device)
    encoder.eval()
    print("Model loaded")

    # Load word map (word2ix)
    with open(word_map_path, 'r') as j:
        word_map = json.load(j)
    rev_word_map = {v: k for k, v in word_map.items()}  # ix2word

    def bat_infer(images):
        result = {}

        for image_path in images:
            seq, alphas = caption_image_beam_search(encoder, decoder, image_path, word_map, beam_size)
            words = [rev_word_map[ind] for ind in seq]
            sentence = " ".join(words[1:-1])
            result[image_path] = sentence

        return result

    return bat_infer


if __name__ == "__main__":
    # 创建 ArgumentParser 对象
    parser = argparse.ArgumentParser(description="这是一个示例程序。")

    # 添加参数
    parser.add_argument('images', metavar='N', type=str, nargs='+',
                        help='图片列表')

    # 解析命令行参数
    args = parser.parse_args()
    infer = create_infer_fn("cuda",
                              "dataset/output/WORDMAP_coco_5_cap_per_img_5_min_word_freq.json",
                              "BEST_checkpoint_coco_5_cap_per_img_5_min_word_freq.pth.tar", 5)
    print(infer(args.images))
