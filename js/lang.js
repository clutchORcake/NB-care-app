const translations = {
  en: {
    title: "Uncle Cheat Sheet",
    subtitle: "A simple baby care manual 💕",
    nav_cheatsheet: "Basic Cheat Sheet",
    nav_signals: "Baby Signals",
    nav_safety: "Safety Rules",
    nav_warning: "Warning Signs",
    nav_tips: "Baby Care Tips",
    logout: "Logout",

    /* Cheatsheet page */
    cs_title: "Basic Baby Care Cheat Sheet",
    cs_wash: "Wash hands before touching baby",
    cs_support: "Support head & neck always",
    cs_feed: "Feed every 2–3 hours",
    cs_burp: "Burp after feeds",
    cs_sleep: "Sleep on back, empty crib",
    cs_cry: "Crying = communication",

    /* Signals page */
    sig_title: "Baby Signals & Needs",
    sig_hungry: "Rooting / sucking hands → Hungry",
    sig_gas: "Squirming, legs up → Gas",
    sig_tired: "Whiny, rubbing eyes → Tired",
    sig_over: "Loud cry after noise → Overstimulated",
    sig_order_label: "Order:",
    sig_order: "Diaper → Feed → Burp → Cuddle",

    /* Safety page */
    safe_title: "Safety Rules",
    safe_shake: "Never shake the baby",
    safe_kiss: "No kissing face or hands",
    safe_food: "No water, honey, or food",
    safe_crib: "No pillows or toys in crib",
    safe_smoke: "No smoking near baby",

    /* Warning page */
    warn_title: "Warning Signs",
    warn_fever: "Fever ≥ 38°C (100.4°F)",
    warn_feed: "No feeding",
    warn_cry: "Very weak or unusual cry",
    warn_blue: "Blue lips or face",
    warn_lethargy: "Extreme lethargy",
    warn_trust: "Trust your instincts.",

    /* Tips page */
    tips_title: "Baby Care Tips",

    tips_rooting_label: "Rooting:",
    tips_rooting: "Turning head, opening mouth, searching to feed",

    tips_burp_label: "Burping:",
    tips_burp: "Helping baby release swallowed air after feeding",

    tips_swaddle_label: "Swaddling:",
    tips_swaddle: "Wrapping baby snugly to feel secure",

    tips_talk: "Talk and sing to the baby often",
    tips_skin: "Skin-to-skin contact helps bonding",
    tips_unique: "Every baby is different",

    /* Cheatsheet – burping methods */
    cs_burp_title: "Burping – 3 Gentle Methods",
    cs_burp_method1: "Over the shoulder – Hold baby upright, gently pat or rub the back",
    cs_burp_method2: "Sitting on lap – Support chest and chin, gently pat the back",
    cs_burp_method3: "Face-down on lap – Baby lies tummy-down across your lap, rub the back",
    cs_burp_note: "Tip:",
    cs_burp_tip: "Try for 1–5 minutes. Sometimes the burp is quiet."

  },
  zh: {
    title: "叔叔育婴速查表",
    subtitle: "简单的新生儿照护指南 💕",
    nav_cheatsheet: "基础照护速查",
    nav_signals: "宝宝信号解读",
    nav_safety: "安全须知",
    nav_warning: "危险征兆",
    nav_tips: "育婴小贴士",
    logout: "退出登录",

    /* Cheatsheet page */
    cs_title: "新生儿基础照护速查表",
    cs_wash: "接触宝宝前要洗手",
    cs_support: "始终托住宝宝的头和颈部",
    cs_feed: "每 2–3 小时喂一次",
    cs_burp: "喂奶后要拍嗝",
    cs_sleep: "仰睡，婴儿床内保持空荡",
    cs_cry: "哭泣是宝宝的沟通方式",

    /* Signals page */
    sig_title: "宝宝信号与需求",
    sig_hungry: "寻找乳头 / 吸手 → 饿了",
    sig_gas: "扭动身体、抬腿 → 胀气",
    sig_tired: "哼唧、揉眼睛 → 困了",
    sig_over: "听到声音后大哭 → 过度刺激",
    sig_order_label: "顺序：",
    sig_order: "换尿布 → 喂奶 → 拍嗝 → 抱抱安抚",

    /* Safety page */
    safe_title: "安全须知",
    safe_shake: "绝对不要摇晃宝宝",
    safe_kiss: "不要亲吻宝宝的脸或手",
    safe_food: "不要喂水、蜂蜜或其他食物",
    safe_crib: "婴儿床内不要放枕头或玩具",
    safe_smoke: "宝宝附近禁止吸烟",

    /* Warning page */
    warn_title: "危险征兆",
    warn_fever: "发烧 ≥ 38°C（100.4°F）",
    warn_feed: "拒绝进食",
    warn_cry: "哭声微弱或异常",
    warn_blue: "嘴唇或脸部发青",
    warn_lethargy: "极度嗜睡、反应迟钝",
    warn_trust: "相信你的直觉。",

    /* Tips page */
    tips_title: "育婴小贴士",

    tips_rooting_label: "寻乳反射：",
    tips_rooting: "转头、张嘴、寻找食物",

    tips_burp_label: "拍嗝：",
    tips_burp: "帮助宝宝排出吃奶时吞入的空气",

    tips_swaddle_label: "包裹：",
    tips_swaddle: "将宝宝包紧，让其有安全感",

    tips_talk: "多和宝宝说话、唱歌",
    tips_skin: "肌肤接触有助于建立亲密感",
    tips_unique: "每个宝宝都是独一无二的",

    /* 速查表 – 拍嗝方法 */
    cs_burp_title: "拍嗝 — 3 种温和方法",
    cs_burp_method1: "靠肩拍嗝 — 将宝宝竖抱，轻轻拍或抚摸背部",
    cs_burp_method2: "坐姿拍嗝 — 让宝宝坐在腿上，托住胸部和下巴，轻拍背部",
    cs_burp_method3: "趴腿拍嗝 — 宝宝趴在大腿上，轻轻抚摸背部",
    cs_burp_note: "小提示：",
    cs_burp_tip: "尝试 1–5 分钟，有时拍嗝是没有声音的。"

  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`.lang-toggle button[onclick*="${lang}"]`)
    ?.classList.add("active");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);
});


