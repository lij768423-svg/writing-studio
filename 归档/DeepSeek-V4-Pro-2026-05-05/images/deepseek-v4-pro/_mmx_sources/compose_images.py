from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_mmx_sources"

REGULAR = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/86ba2c91f017a3749571a82f2c6d890ac7ffb2fb.asset/AssetData/PingFang.ttc"
BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"

W, H = 1280, 720


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else REGULAR, size=size)


def text_size(draw, text, fnt):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_text(draw, xy, text, size, fill=(245, 252, 255), bold=False):
    draw.text(xy, text, font=font(size, bold), fill=fill)


def fit_text(draw, text, max_width, start_size, bold=False, min_size=24):
    size = start_size
    while size > min_size:
        fnt = font(size, bold)
        if text_size(draw, text, fnt)[0] <= max_width:
            return fnt
        size -= 2
    return font(min_size, bold)


def rounded(draw, box, radius=22, fill=(5, 18, 26, 185), outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def line(draw, xy, fill=(39, 228, 255, 190), width=3):
    draw.line(xy, fill=fill, width=width)


def gradient_overlay(img, left=210, right=70, bottom=90):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    px = overlay.load()
    for x in range(W):
        x_alpha = int(left * (1 - x / W) + right * (x / W))
        for y in range(H):
            y_alpha = int(bottom * (y / H) ** 2)
            px[x, y] = (0, 8, 15, min(235, x_alpha + y_alpha))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def load_bg(name, blur=0):
    img = Image.open(SRC / name).convert("RGB").resize((W, H), Image.Resampling.LANCZOS)
    img = ImageEnhance.Color(img).enhance(0.92)
    img = ImageEnhance.Contrast(img).enhance(1.08)
    if blur:
        img = img.filter(ImageFilter.GaussianBlur(blur))
    return gradient_overlay(img)


def save(img, name):
    img.convert("RGB").save(ROOT / name, quality=94, subsampling=0)


def chip(draw, x, y, label, accent=(39, 228, 255)):
    fnt = font(25, True)
    tw, th = text_size(draw, label, fnt)
    box = (x, y, x + tw + 38, y + 50)
    rounded(draw, box, radius=25, fill=(8, 29, 40, 205), outline=accent + (150,), width=2)
    draw.ellipse((x + 15, y + 19, x + 23, y + 27), fill=accent + (255,))
    draw.text((x + 32, y + 10), label, font=fnt, fill=(238, 252, 255))
    return box[2]


def bullet(draw, x, y, label, accent=(39, 228, 255)):
    draw.ellipse((x, y + 11, x + 11, y + 22), fill=accent + (255,))
    draw_text(draw, (x + 25, y), label, 27, fill=(238, 250, 252), bold=True)


def cover():
    img = load_bg("cover-bg.jpg")
    draw = ImageDraw.Draw(img)
    draw_text(draw, (72, 70), "DeepSeek V4 Pro", 72, bold=True)
    draw_text(draw, (76, 160), "开源代码最强", 54, fill=(42, 236, 255), bold=True)
    draw_text(draw, (76, 232), "真实工作里该怎么用", 42, bold=True)
    draw_text(draw, (78, 320), "强，但强得很具体。", 34, fill=(210, 233, 239))
    rounded(draw, (76, 392, 620, 516), radius=24, fill=(4, 20, 30, 178), outline=(57, 221, 255, 125), width=2)
    draw_text(draw, (108, 418), "代码 / Agent / 1M 上下文", 30, fill=(235, 251, 255), bold=True)
    draw_text(draw, (108, 466), "适合量大、可迭代、成本敏感的任务", 25, fill=(180, 213, 222))
    draw_text(draw, (82, 635), "数据截止：2026.05.05", 22, fill=(142, 185, 196))
    save(img, "cover.jpg")


def strengths():
    img = load_bg("strengths-bg.jpg", blur=1)
    draw = ImageDraw.Draw(img)
    draw_text(draw, (72, 58), "先说它到底强在哪", 54, bold=True)
    draw_text(draw, (75, 124), "代码能力、Agent 能力、长上下文和中文处理，是这次的核心卖点。", 27, fill=(190, 222, 230))
    cards = [
        ("Codeforces", "3206", "竞赛级编程"),
        ("LiveCodeBench", "93.5", "实用代码生成"),
        ("Context", "1M", "百万 token 上下文"),
        ("SuperCLUE", "国内第一", "中文能力"),
    ]
    x0, y0 = 74, 230
    for i, (k, v, desc) in enumerate(cards):
        x = x0 + (i % 2) * 365
        y = y0 + (i // 2) * 170
        rounded(draw, (x, y, x + 320, y + 128), radius=20, fill=(5, 24, 34, 205), outline=(45, 229, 255, 115), width=2)
        draw_text(draw, (x + 26, y + 20), k, 23, fill=(155, 211, 224))
        vfont = fit_text(draw, v, 260, 45, True, 30)
        draw.text((x + 26, y + 52), v, font=vfont, fill=(245, 252, 255))
        draw_text(draw, (x + 26, y + 98), desc, 23, fill=(174, 219, 228))
    chip(draw, 74, 590, "开源模型里非常能打")
    save(img, "strengths.jpg")


def limits():
    img = load_bg("limits-bg.jpg")
    draw = ImageDraw.Draw(img)
    draw_text(draw, (72, 58), "但这些地方，还不够", 54, bold=True)
    draw_text(draw, (76, 124), "跑分强，不等于真实任务里处处放心。", 29, fill=(198, 226, 232))
    items = [
        ("复杂工程", "从零搭项目仍容易掉链子"),
        ("前端审美", "能做功能，品味不够稳"),
        ("事实准确", "知识类任务要复核"),
        ("多模态", "不能识图是硬伤"),
    ]
    for i, (title, body) in enumerate(items):
        y = 224 + i * 86
        rounded(draw, (74, y, 610, y + 62), radius=18, fill=(8, 24, 33, 202), outline=(255, 180, 82, 105), width=2)
        draw_text(draw, (102, y + 13), title, 27, fill=(255, 210, 132), bold=True)
        draw_text(draw, (235, y + 16), body, 24, fill=(229, 240, 240))
    line(draw, [(76, 586), (588, 586)], fill=(255, 176, 76, 180), width=4)
    draw_text(draw, (76, 610), "结论：适合高性价比试错，不适合第一次就必须正确。", 25, fill=(215, 230, 232))
    save(img, "limits.jpg")


def workflow():
    img = load_bg("workflow-bg.jpg")
    draw = ImageDraw.Draw(img)
    draw_text(draw, (72, 54), "最佳用法：不是替代，是搭配", 50, bold=True)
    draw_text(draw, (76, 116), "把量大、可迭代的任务交给 V4 Pro，把高风险和审美任务交给闭源旗舰。", 26, fill=(196, 225, 232))
    rounded(draw, (78, 220, 570, 505), radius=24, fill=(4, 25, 38, 202), outline=(38, 223, 255, 120), width=2)
    rounded(draw, (710, 220, 1202, 505), radius=24, fill=(27, 15, 36, 202), outline=(216, 134, 255, 120), width=2)
    draw_text(draw, (114, 254), "DeepSeek V4 Pro", 36, fill=(73, 234, 255), bold=True)
    draw_text(draw, (746, 254), "GPT-5.5 / Claude", 36, fill=(232, 178, 255), bold=True)
    left = ["长文档分析", "Agent 后台自动化", "日常编程", "中文内容处理"]
    right = ["核心代码首版", "精致前端输出", "知识密集分析", "多模态理解"]
    for i, t in enumerate(left):
        bullet(draw, 122, 330 + i * 43, t, accent=(39, 228, 255))
    for i, t in enumerate(right):
        bullet(draw, 754, 330 + i * 43, t, accent=(214, 136, 255))
    draw.line((576, 360, 705, 360), fill=(236, 248, 255, 150), width=4)
    draw.polygon([(704, 360), (684, 349), (684, 371)], fill=(236, 248, 255, 170))
    draw_text(draw, (465, 585), "分工，而不是迷信单一模型", 34, fill=(242, 250, 252), bold=True)
    save(img, "workflow.jpg")


def decision():
    img = load_bg("decision-bg.jpg", blur=1)
    draw = ImageDraw.Draw(img)
    draw_text(draw, (72, 58), "一个判断框架", 56, bold=True)
    draw_text(draw, (76, 126), "下次不知道该选哪个模型，先问三个问题。", 29, fill=(197, 225, 231))
    qs = [
        ("1", "这个任务允许犯错吗？"),
        ("2", "你需要功能，还是品味？"),
        ("3", "信息量大不大？"),
    ]
    for i, (n, q) in enumerate(qs):
        y = 225 + i * 105
        draw.ellipse((82, y, 138, y + 56), fill=(18, 206, 230, 230))
        draw_text(draw, (101, y + 9), n, 28, fill=(4, 18, 24), bold=True)
        rounded(draw, (158, y - 4, 700, y + 60), radius=18, fill=(5, 24, 34, 205), outline=(43, 225, 255, 110), width=2)
        draw_text(draw, (186, y + 12), q, 29, fill=(239, 251, 253), bold=True)
    rounded(draw, (790, 232, 1176, 332), radius=24, fill=(5, 35, 46, 210), outline=(43, 225, 255, 130), width=2)
    draw_text(draw, (826, 258), "可改、量大、上下文长", 28, fill=(218, 248, 252), bold=True)
    draw_text(draw, (826, 296), "优先 V4 Pro", 29, fill=(48, 236, 255), bold=True)
    rounded(draw, (790, 396, 1176, 496), radius=24, fill=(46, 30, 9, 210), outline=(255, 187, 80, 140), width=2)
    draw_text(draw, (826, 422), "首次要对、审美要稳", 28, fill=(255, 238, 210), bold=True)
    draw_text(draw, (826, 460), "上闭源旗舰", 29, fill=(255, 192, 88), bold=True)
    line(draw, [(700, 254), (790, 282)], fill=(43, 225, 255, 170), width=3)
    line(draw, [(700, 465), (790, 446)], fill=(255, 187, 80, 170), width=3)
    save(img, "decision.jpg")


if __name__ == "__main__":
    cover()
    strengths()
    limits()
    workflow()
    decision()
