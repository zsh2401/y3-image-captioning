#!/usr/bin/env bash
# Seymour Zhang
echo Executing inference at $1
python caption.py --img=$1 --model="./BEST_checkpoint_coco_5_cap_per_img_5_min_word_freq.pth" --word_map="./dataset/output/WORDMAP_coco_5_cap_per_img_5_min_word_freq.json" --beam_size=5