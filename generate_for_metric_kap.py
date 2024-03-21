# 为CaptionMetric准备在kap测试集上
# 生成的测试结果
# Mar 14, 2024 Seymour Zhang
import time
import torch.backends.cudnn as cudnn
import torch.optim
import torch.utils.data
import torchvision.transforms as transforms
from torch import nn
from torch.nn import DataParallel
from torch.nn.utils.rnn import pack_padded_sequence
from models import Encoder, DecoderWithAttention
from datasets import *
from utils import *
from nltk.translate.bleu_score import corpus_bleu
from infer import create_infer_fn

# Parameters
data_folder = 'dataset/output'  # folder with data files saved by create_input_files.py
data_name = 'coco_5_cap_per_img_5_min_word_freq'  # base name shared by data files
checkpoint = './checkpoints/best.pth'  # model checkpoint
word_map_file = 'dataset/output/WORDMAP_coco_5_cap_per_img_5_min_word_freq.json'  # word map, ensure it's the same the data was encoded with and the model was trained with
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")  # sets device for model and PyTorch tensors
cudnn.benchmark = True  # set to true only if inputs to model are fixed size; otherwise lot of computational overhead
beam_size = 1

# Normalization transform
normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225])


def main():
   
    with open(word_map_file) as word_map_file_obj:
        word_map =  json.load(word_map_file_obj)
        word_map = {v : k for k, v in word_map.items()}
        # print(word_map)
        
    def translate(caps):
        caps = [int(cap) for cap in caps]
        valid_numbers = list(filter(lambda cap: cap not in {9488,9489,0},caps))
        return " ".join([word_map[no] for no in valid_numbers])

    loader = torch.utils.data.DataLoader(
    CaptionDataset(data_folder, data_name, 'TEST', transform=transforms.Compose([normalize])),
        batch_size=1, shuffle=True, num_workers=1, pin_memory=True)
        
    infer = create_infer_fn(device,word_map_file,checkpoint,5)


        
        # For each image
    gts = {}
    res = {}
    print("Executing inference with trained model on kap testset.")
    for i, (image, caps, caplens, allcaps) in enumerate(
            tqdm(loader,desc="Inferring")):
        
        image = image.to(device)
        
        caption = translate(caps[0])
    
        pred = [v for v in infer([image])][0]
        
        # print(pred)
            
        gts[str(i)] = [caption]
        res[str(i)] = pred
        # if i > 100:
        #     break

    print("Inference is done")
    with open("gts.json","w") as f:
        json.dump(gts,f,sort_keys=True)
        
    with open("res.json","w") as f:
        json.dump(res,f,sort_keys=True)


if __name__ == "__main__":
    main()