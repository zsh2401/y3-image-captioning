# Seymour Zhang's Note

* dataset中的数据可以认为是只读的。
* 运行train.py即可训练

使用如下代码创建conda环境：
```shell
conda env create -f environment.yml
```

# 2024/3/13 23:24
batch_size设置为128，重新开始训练模型，内存占用约为8000MB

# 2024/3/25 21:35
使用此前最佳的数据，在CaptionMetric上进行苹果，结果为
在best.pth上，y3对kap test进行测试，测量结果如下：
```json
{'testlen': 234320, 'reflen': 261001, 'guess': [234320, 209320, 184320, 159320], 'correct': [97279, 32244, 12723, 5784]}
ratio: 0.8977743380293528
belu = [0.37047466477192337, 0.22566943288531444, 0.14638742509997657, 0.10040481012422037]
cider = 0.9907883972816691
meter = 0.16008833788651
rouge = 0.35627466790296525
Parsing reference captions
Parsing test captions
SPICE evaluation took: 5.548 s
spice = 0.23284218096403117
```